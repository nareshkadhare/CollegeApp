import { Component, OnInit } from '@angular/core';
import { AppcommonService } from "../services/appcommon.service";

import { DbserviceService, C_Subject } from "../services/dbservice.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  subjects: C_Subject[] = [];

  constructor(public db: DbserviceService, public commonService: AppcommonService) {


  }

  ionViewDidEnter() {

    //FETCH DATA
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {

        this.db.getSubjects().subscribe(subjects => {
          this.subjects = subjects;
        })
      }
    });
  }

  ngOnInit() {


  }

  
}
