import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formgroup: FormGroup;
  count:number;
  error: boolean = false;
  errorstatement: string;
  pattern = "[0-9].{0,2}"
  branchs=['ECE','CIVIL','MECH','EEE','CSE']
  ngOnInit() {
    this.formgroup = this.fb.group({
      firstname: ['', [Validators.required,Validators.pattern("[a-zA-Z]*")]],
      lastname: ['', [Validators.required,Validators.pattern("[a-zA-Z]*")]],
     branch: ['', [Validators.required]],
      physics: ['', [Validators.required,Validators.pattern(this.pattern)]],
      english: ['', [Validators.required,Validators.pattern(this.pattern)]],
      maths: ['', [Validators.required,Validators.pattern(this.pattern)]],
      chemistry: ['', [Validators.required,Validators.pattern(this.pattern)]],
    });
  
this.count=this.shared.GetPassCount();
console.log(this.count);
  }
  constructor(public fb: FormBuilder, public apiservice: StudentService, public router: Router,public shared:SharedService,private snackBar: MatSnackBar) {
  }
  submit() {
    let request: any = {
      firstname: this.formgroup.value.firstname,
      lastname: this.formgroup.value.lastname,
      branch: this.formgroup.value.branch,
      physics:this.formgroup.value.physics,
      english:this.formgroup.value.english,
      maths:this.formgroup.value.maths,
      chemistry:this.formgroup.value.chemistry
    }
    console.log(request);
    this.apiservice.add(request).map(data => data).subscribe(data => {
      if (data.result == true) {
        this.error = data.result;
        this.errorstatement = data.status;
        this.openSnackBar("Data added Sucessfully","");
        this.router.navigateByUrl('');
      }
      else {
        this.error = false;
        this.errorstatement = "Verify your details";
      }
    });
    
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
