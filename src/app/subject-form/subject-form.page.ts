import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DbserviceService } from '../services/dbservice.service';
import { AppcommonService } from "../services/appcommon.service";

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.page.html',
  styleUrls: ['./subject-form.page.scss'],
})
export class SubjectFormPage implements OnInit {

  @ViewChild("noOfSubjectInput", { static: true }) noOfSubjectInput;  

  public validations_form: FormGroup;

  submitted = false;
  lectureCount: number = 1;
  public lectures: Array<number>;


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

  constructor(public formBuilder: FormBuilder,
    private dbservice: DbserviceService, private cmnService: AppcommonService) {

  }

  ngOnInit() {

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
      this.dbservice.addsubject(this.validations_form,this.lectureCount).
        then(data => {          
          this.cmnService.presentToast("Your subjects saved successfully.");
          this.onReset();
        }).catch(e => {
          err = e;
        }).finally(() => {
          this.lectureCount=1;          
          this.lectures = [];
          this.submitted = false;
          this.cmnService.stopLoading().finally(() => {
            if (err) {
              this.cmnService.presentToast('<ion-icon name="information-circle-outline"></ion-icon> There is some technical problem.',"danger");
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

  checkValue(name,i) {
    
    if (this.validations_form.get(name+i) !== null && this.validations_form.get(name+i).value!==null && this.validations_form.get(name+i).value.trim() === "") {
      this.validations_form.get(name+i).setValue("");
    }
    return;
  }

  ionViewDidEnter() {
    this.noOfSubjectInput.setFocus();
  }

  createSubject() {
    let err;
    if (isNaN(this.lectureCount)) {
      err = 'Please provide valid input number.';
    }
    else if (this.lectureCount < 1) {
      err = 'Number of subjects must be greter than zero(0).';
    } else {
      this.lectures = new Array(Number(this.lectureCount));
      this.makeElements();
      return;
    }

    if (err) {
      this.cmnService.presentToast('<ion-icon name="information-circle-outline"></ion-icon> ' + err, "danger");
      this.noOfSubjectInput.setFocus();
    }
  }


  makeElements() {
    
    let formInputs:Object=new Object();
    for (let index = 0; index < this.lectures.length; index++) {

      formInputs["subjectname"+index] = new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.required
      ]));

      formInputs["facultyname"+index] = new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.required
      ]));             
    }    
    this.validations_form = this.formBuilder.group(formInputs);    
  }
} 
