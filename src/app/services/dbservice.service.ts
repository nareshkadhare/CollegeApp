import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { async } from 'q';

import { AppcommonService } from "./appcommon.service";
import { error } from 'util';


export interface C_Subject {
  ID: number,
  SUBJECT_NAME: string,
  FACULTY_NAME: string
}

export interface Lecture {
  LECTURE_ID: number,
  DAY: string,
  START_TIME: string,
  END_TIME: string,
  SUBJECT_NAME: string
}



@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  subjects = new BehaviorSubject([]);
  lectures = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter,
    private sqlite: SQLite, private http: HttpClient,private cmnService:AppcommonService) {
    
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'collegeapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();

        });
    }).finally(()=>{
       
    });
  }

  seedDatabase() {
    this.cmnService.presentLoading("Loading...");
    this.http.get('assets/dbData.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadSubjects();
            this.loadLectures();
            this.dbReady.next(true);
            console.log("DB IMPORTED");
          })          
      },error => {
        console.log(error);
      },()=>{        
        this.cmnService.stopLoading(); 
      });
  }

  getDatabaseState(): Observable<any> {  
    return this.dbReady.asObservable();
  }

  getSubjects(): Observable<C_Subject[]> {
    return this.subjects.asObservable();
  }

  getProducts(): Observable<Lecture[]> {
    return this.lectures.asObservable();
  }

  loadSubjects() {
    
    return this.database.executeSql('SELECT * FROM SUBJECT', []).then(data => {
      let subjects: C_Subject[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          subjects.push({
            ID: data.rows.item(i).SUBJECT_ID,
            SUBJECT_NAME: data.rows.item(i).SUBJECT_NAME,
            FACULTY_NAME: data.rows.item(i).FACULTY_NAME,
          });
        }
      }
      this.subjects.next(subjects);
    });
  }


  async addsubject(SUBJECT_NAME, FACULTY_NAME) {
    let data = [SUBJECT_NAME, FACULTY_NAME];
    return await this.database.executeSql('INSERT INTO SUBJECT (SUBJECT_NAME, FACULTY_NAME) VALUES (?, ?)', data).then( data => {      
      this.loadSubjects();
    });
  }

  loadLectures() {

  }
}
