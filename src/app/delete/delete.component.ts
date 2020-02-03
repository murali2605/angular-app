import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { SharedService } from '../shared.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  deleteaccount: boolean;
  rollno: number;
  

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,public shared:SharedService,public apiservice:StudentService,private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  onNoClick(){
    this.dialogRef.close();
  }
  onDelete() {
    this.rollno=this.shared.GetRollno();
    this.apiservice.delete(this.rollno).map(data => data).subscribe(data => {
      console.log(data);
      if(data==1)
      {
      this.dialogRef.close();
      this.openSnackBar("Data Deleted","");
      window.location.reload();
      }
    });
    
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
