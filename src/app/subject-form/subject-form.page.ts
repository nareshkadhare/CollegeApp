import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DbserviceService, C_Subject } from '../services/dbservice.service';
import { AppcommonService } from "../services/appcommon.service";
import { ActivatedRoute,Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.page.html',
  styleUrls: ['./subject-form.page.scss'],
})
export class SubjectFormPage implements OnInit {

  @ViewChild("noOfSubjectInput", { static: true }) noOfSubjectInput;

  public validations_form: FormGroup;

  public singleSubject: C_Subject;

  public subject_id = null;
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
    private dbservice: DbserviceService, 
    private cmnService: AppcommonService, 
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private location: Location) {

  }

  ngOnInit() {
    this.subject_id = this.activatedRoute.snapshot.paramMap.get('subject_id');
    if (this.subject_id != null) {
      this.lectures = new Array(Number(1));
      this.makeElements();
    }
  }



  onSubmit() {

    this.submitted = true;
    if (this.validations_form.invalid) {
      return;
    }
    let err;

    if (this.validations_form.valid) {

      this.cmnService.presentLoading("Request Processing...");

      if (this.subject_id != null) {

        
        this.dbservice.updateSubject(this.validations_form.get("subjectname0").value,this.validations_form.get("facultyname0").value,this.subject_id)
        .then(data=>{

          this.cmnService.presentToast("Your subjects updated successfully.");

          setTimeout(() => {
            this.location.back();  
          }, 500);
          

        }).catch(e => {
          err = e;
        }).finally(() => {          
          this.cmnService.stopLoading().finally(() => {
            if (err) {
              this.cmnService.presentToast('<ion-icon name="information-circle-outline"></ion-icon> There is some technical problem.', "danger");
            }
          });

        });

      } else {

        this.dbservice.addsubject(this.validations_form, this.lectureCount).
          then(data => {
            this.cmnService.presentToast("Your subjects saved successfully.");
            setTimeout(() => {
              this.location.back();  
            }, 500);
          }).catch(e => {
            err = e;
          }).finally(() => {
            this.lectureCount = 1;
            this.lectures = [];
            this.submitted = false;
            this.cmnService.stopLoading().finally(() => {
              if (err) {
                this.cmnService.presentToast('<ion-icon name="information-circle-outline"></ion-icon> There is some technical problem.', "danger");
              }
            });

          });
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.validations_form.reset();
  }

  getFormValue(name) {
    return this.validations_form.get(name).value.trim();
  }

  checkValue(name, i) {

    if (this.validations_form.get(name + i) !== null && this.validations_form.get(name + i).value !== null && this.validations_form.get(name + i).value.trim() === "") {
      this.validations_form.get(name + i).setValue("");
    }
    return;
  }

  ionViewDidEnter() {
    if (this.subject_id == null) {
      this.noOfSubjectInput.setFocus();
    } else {
      this.singleSubject = this.dbservice.getSingleSubject();      
      this.validations_form.get("subjectname0").setValue(this.singleSubject.SUBJECT_NAME);
      this.validations_form.get("facultyname0").setValue(this.singleSubject.FACULTY_NAME);      
    }
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

    let formInputs: Object = new Object();
    for (let index = 0; index < this.lectures.length; index++) {

      formInputs["subjectname" + index] = new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.required
      ]));

      formInputs["facultyname" + index] = new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.required
      ]));
    }
    this.validations_form = this.formBuilder.group(formInputs);
  }
} 
