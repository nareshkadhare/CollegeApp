import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public monday : boolean;
  constructor() {
    this.monday = true;
  }

  showTable(day) {
    
    if(this.monday) {
      this.monday = false
    } else{
      this.monday = true;
    }
  }

  getDay(name:string) {
    
    // let day;
    // switch(name) {
    //   case "MONDAY" : 
    //     day = ;
    // }
    return this.monday;
  }
}
