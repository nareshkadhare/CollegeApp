import { Component, OnInit } from '@angular/core';
import { AppcommonService } from "../services/appcommon.service";
import { ActionSheetController } from '@ionic/angular';
import { DbserviceService, C_Subject } from "../services/dbservice.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  subjects: C_Subject[] = [];

  constructor(public db: DbserviceService,
    public commonService: AppcommonService,
    public actionSheetController: ActionSheetController) {


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

  async presentActionSheet(subject_id) {
    
    const actionSheet = await this.actionSheetController.create({
      header: 'ACTIONS',
      cssClass: 'myActionSheet',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        cssClass: 'myActionSheetBtn',
        icon: 'trash',
        handler: () => {

          this.commonService.presentLoading("Requrest processing...");
          this.db.deleteSubject(subject_id).then( data => {
            this.commonService.presentToast('<ion-icon name="information-circle-outline"></ion-icon> Subject removed successfully.');
          }).
          catch( e => {
            this.commonService.presentToast('<ion-icon name="information-circle-outline"></ion-icon> There is some technical problem',"danger");
          })
          .finally(() => {
            this.commonService.stopLoading();
          })
        }
      }, {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          console.log('Share clicked');
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
