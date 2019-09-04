import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: 'app-lectureform',
  templateUrl: './lectureform.page.html',
  styleUrls: ['./lectureform.page.scss'],
})
export class LectureformPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController) {

  }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Your Subject',
      buttons: [{
        text: 'JAVA',
        icon: 'bookmarks',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'ASP',
        icon: 'bookmarks',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'PHP',
        icon: 'bookmarks',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'ANDROID',
        icon: 'bookmarks',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'AWC',
        icon: 'bookmarks',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
