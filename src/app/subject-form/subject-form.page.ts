import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from "@ionic/angular";
import { DbserviceService } from '../services/dbservice.service';
import { AppcommonService } from "../services/appcommon.service";

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.page.html',
  styleUrls: ['./subject-form.page.scss'],
})
export class SubjectFormPage implements OnInit {

  public validations_form: FormGroup;

  submitted = false;


  public validation_messages = {
    subjectname: [
      { type: "required", message: "Subject name is required." },
      { type: 'pattern', message: 'Subject name must contain only numbers and letters.' }
    ],
    facultyname: [
      { type: "required", message: "Faculty name is required." },
      { type: 'pattern', message: 'Faculty name must contain only numbers and letters.' }
    ]
  }

  constructor(public formBuilder: FormBuilder, public toastController: ToastController,
    private dbservice: DbserviceService, private cmnService: AppcommonService) {

  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      subjectname: new FormControl('', Validators.compose([
        Validators.maxLength(50),

        Validators.required
      ])),
      facultyname: new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.required
      ]))
    });
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.validations_form.invalid) {
      return;
    }


    let err;

    if (this.validations_form.valid) {

      this.cmnService.presentLoading("Request Processing...");
      
      this.dbservice.addsubject(this.getFormValue("subjectname"), this.getFormValue("facultyname")).
        then( data => {          
          this.cmnService.presentToast("Your subject saved successfully.");                    
          this.onReset();
        }).catch(e => {          
          err = e;
        }).finally(() => {                               
           this.cmnService.stopLoading().finally(() => {            
            if (err) {
              this.cmnService.presentToast("There is some technical problem.");
            }
          });

        });

    }
  }

  onReset() {
    this.submitted = false;
    this.validations_form.reset();
  }

  getFormValue(name) {
    return this.validations_form.get(name).value.trim();
  }

  checkValue(name) {
    if (this.validations_form.get(name) !== null && this.validations_form.get(name).value.trim() === "") {
      this.validations_form.get(name).setValue("");
    }
  }
} 
