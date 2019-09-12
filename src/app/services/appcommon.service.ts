import { Injectable } from '@angular/core';
import { LoadingController,ToastController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AppcommonService {

  loading: any;
  

  constructor(public loadingController: LoadingController,private toastController:ToastController) { }

  async presentLoading(msg) {
    this.loading = await this.loadingController.create({
      message: msg,
    });
    return await this.loading.present();
  }

  async stopLoading() {
    return await setTimeout(_ => {
      this.loading.dismiss();
    }, 100)
  }

  async presentToast(message,color='dark') {
    const toast = await this.toastController.create({
      position: 'top',
      message: message,
      color: color,
      cssClass:"info",
      duration: 1500,
      keyboardClose: true
    });
    await toast.present();
  }
}
