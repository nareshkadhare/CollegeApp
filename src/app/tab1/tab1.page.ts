import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public weekdays: Array<string>;
  public currentDay : string;
  public currentDate : string;

  constructor() {
    let date = new Date();
    this.weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    this.currentDay = this.weekdays[date.getDay()];
    this.currentDate = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
  }

}
