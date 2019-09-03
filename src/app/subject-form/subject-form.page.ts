import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.page.html',
  styleUrls: ['./subject-form.page.scss'],
})
export class SubjectFormPage implements OnInit {

  public validations_form: FormGroup;
  
  public validation_messages = {
    subjectname: [
      { type: "required", message:"Subject name is required." },
      { type: "maxlength", message:"Subject name length  cannot be more than 50 characters long." },
      { type: 'pattern', message: 'Subject name must contain only numbers and letters.' }
    ],
    facultyname: [
      { type: "required", message:"Faculty name is required." },
      { type: "maxlength", message:"Faculty name length  cannot be more than 50 characters long." },
      { type: 'pattern', message: 'Faculty name must contain only numbers and letters.' }
    ]
  }

  constructor(public formBuilder: FormBuilder,public toastController:ToastController) {

  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      subjectname: new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9]*$'),
        Validators.required
      ])),
      facultyname: new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9]*$'),
        Validators.required
      ]))
    });
  }

  onSubmit(value) {
    
    if(this.validations_form.valid) {
      this.presentToast("Your subject saved successfully."); 
    } 
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      position: 'bottom',             
      message: message,
      color :'mybg', 
      duration: 1500,
      keyboardClose:true
    });
    toast.present();
  }
} 
