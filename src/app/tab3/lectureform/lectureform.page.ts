import { Component, OnInit } from '@angular/core';
import { ActionSheetController,AlertController } from "@ionic/angular";

@Component({
  selector: 'app-lectureform',
  templateUrl: './lectureform.page.html',
  styleUrls: ['./lectureform.page.scss'],
})
export class LectureformPage implements OnInit {

  public lectures:Array<number>;
  public lectureCount = 1;

  constructor(public actionSheetController: ActionSheetController,public alertController:AlertController) {
    // this.presentAlertRadio();
  }

  createLectur() {
    this.lectures = new Array(Number( this.lectureCount));            
  }

  ngOnInit() {
    
    
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Your Subject',
      cssClass: 'action-sheets-basic-page',
      buttons: [{
        text: 'JAVA',
        cssClass : 'actionsheet-Share',
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

  

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Number of Lectures?',
      backdropDismiss : false,
      inputs: [
        {
          name: 'totalLecture',
          type: 'text',
          label: 'Radio 1',
          min:1,
          max:20,
          value: 1
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler:  data => {
            console.log('Confirm Cancel'+this.lectures);
          }
        }, {
          text: 'Ok',
          handler:data => {
            
          }
        }
      ]
    });

    await alert.present();
  }
}
