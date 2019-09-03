import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public expand_collapse: boolean;

  public days = [true, false, false, false, false, false];

  constructor() {
    this.expand_collapse = false;
  }

  showTable(index) {

    if (this.days[index]) {
      this.days[index] = false
    } else {
      this.days[index] = true;
    }


    let counter = 0;
    for (let index = 0; index < this.days.length; index++) {
      if (this.days[index]) {
        counter++;
      }
    }

    if (counter == 0) {
      this.expand_collapse = false;
    }
    else if (counter == 6) {      
      this.expand_collapse = true;
    }

  }

  changeExpandCollapse() {
    for (let index = 0; index < this.days.length; index++) {
      this.days[index] = this.expand_collapse;
    }
  }
}