import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { async } from 'q';

import { AppcommonService } from "./appcommon.service";
import { error } from 'util';


export interface C_Subject {
  SUBJECT_ID: number,
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

  private singleSubject: C_Subject;

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter,
    private sqlite: SQLite, private http: HttpClient, private cmnService: AppcommonService) {

    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'collegeapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();

        });
    }).finally(() => {

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
      }, error => {
        console.log(error);
      }, () => {
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

  getSingleSubject(): C_Subject {
    return this.singleSubject;
  }

  loadSingleSubject(SUBJECT_ID) {
    let data = [SUBJECT_ID];
    return this.database.executeSql(" SELECT * FROM SUBJECT WHERE SUBJECT_ID = ? ", data).then(data => {

      let subjects: C_Subject[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          subjects.push({
            SUBJECT_ID: data.rows.item(i).SUBJECT_ID,
            SUBJECT_NAME: data.rows.item(i).SUBJECT_NAME,
            FACULTY_NAME: data.rows.item(i).FACULTY_NAME,
          });
        }
      }
      this.singleSubject = subjects[0];
    });
  }

  loadSubjects() {

    return this.database.executeSql('SELECT * FROM SUBJECT ORDER BY SUBJECT_ID DESC', []).then(data => {
      let subjects: C_Subject[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          subjects.push({
            SUBJECT_ID: data.rows.item(i).SUBJECT_ID,
            SUBJECT_NAME: data.rows.item(i).SUBJECT_NAME,
            FACULTY_NAME: data.rows.item(i).FACULTY_NAME,
          });
        }
      }
      this.subjects.next(subjects);
    });
  }


  async addsubject(form_data, record) {

    let data = [];

    let query = "INSERT INTO SUBJECT (SUBJECT_NAME, FACULTY_NAME) VALUES ";
    for (let index = 0; index < record; index++) {
      query += "(?, ?)";
      if (index != record - 1) {
        query += ","
      }
      data.push(form_data.get("subjectname" + index).value.trim());
      data.push(form_data.get("facultyname" + index).value.trim());
    }
    return await this.database.executeSql(query, data).then(data => {
      this.loadSubjects();
    });
  }


  async deleteSubject(subject_id) {
    let data = [subject_id];
    return await this.database.executeSql("DELETE FROM SUBJECT WHERE SUBJECT_ID = ?", data).then(data => {
      this.loadSubjects();
    });
  }


  async updateSubject(subjectname, facultyname, subject_id) {
    let data = [subjectname, facultyname, subject_id];
    return await this.database.executeSql("UPDATE SUBJECT SET SUBJECT_NAME= ? , FACULTY_NAME=? WHERE SUBJECT_ID = ?", data).then(data => {
      this.loadSubjects();
    });
  }

  loadLectures() {

  }
}
