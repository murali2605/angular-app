import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import 'rxjs/add/operator/map';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
  rollno:number=0;
  count:number=0;
  totalcount:number=0;
  passcount:number=0;
  failcount:number=0;
  Rollno: string;
  firstname: string;
  lastname: string;
  branch: string;
  percentage: string;
  status: string;
  constructor(public apiservice: StudentService, public dialog: MatDialog,public shared:SharedService) { }
  displayedColumns: string[] = ['rollno', 'firstname', 'lastname', 'branch','Physics','English','Maths','Chemistry', 'percentage', 'status', 'blank1', 'blank2'];
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  details:any[]=[];
  ngOnInit() {
    this.apiservice.studentDetails().map(data => data).subscribe(data => {
     this.shared.SetData(data);
      data.forEach(element => {
        let request = {
          rollno:element.rollno,
          firstname:element.firstname,
          lastname:element.lastname,
          branch:element.branch,
          Physics:element.Physics,
          English:element.English,
          Maths:element.Maths,
          Chemistry:element.Chemistry,
          percentage:element.percentage,
          status:element.percentage < 35 ? "Fail" :"Pass"
        }
        this.details.push(request);
      });
     this.details.forEach(data => {
       this.totalcount+=1;
       if(data.status=="Pass")
       {
         this.passcount+=1;
      
       }
       
       else
       {
         this.failcount+=1;
       }
     })
      this.dataSource = new MatTableDataSource(this.details);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.shared.SetPassCount(this.passcount);
      this.shared.SetFailCount(this.failcount);
      this.shared.SetTotalCount(this.totalcount);
       
      // console.log(this.passcount);
      // console.log(this.failcount);
    });

  }
  opendeletepopup(value:any): void {
    this.shared.SetRollno(value);
    const dialogRef = this.dialog.open(DeleteComponent ,{
      panelClass: 'padding-dailog',
      width: '420px',
      height: '200px',
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
   
  }
  
  searchFilter(filterValue: string) {
    this.dataSource.filter = filterValue.toLowerCase();
  }
  onEdit(rollno: any) {
    this.Rollno = rollno;
    this.dialog.open(StudentDetailsDialog, {
      data: { rollno: this.Rollno }
    });
  }
}

@Component({
  selector: 'studentdetailsdialog',
  templateUrl: 'studentdetails.html',
  styleUrls: ['./student.component.css']
})
export class StudentDetailsDialog {
  error: boolean = false;
  errorstatement: string;
  no: string;
  Rollno: string;
  fname: string;
  lname: string;
  branch: string;
  percentage: string;
  status: string;
  Physics: number;
  English: number;
  Chemistry: number;
  Maths: number;

  constructor(public dialogRef: MatDialogRef<StudentDetailsDialog>, public apiservice: StudentService, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }
  ngOnInit() {
    this.no = this.data.rollno;
    console.log(this.no);
    this.apiservice.studentid(this.no).map(data => data).subscribe(data => {
      if (data.result == false) {
        this.error = true;
        this.errorstatement = data.status;
      }
      else {
        this.error = false;
        this.Rollno = data[0].rollno;
        console.log(this.Rollno);
        this.fname = data[0].firstname;
        console.log(this.fname);
        this.lname = data[0].lastname;
        this.branch = data[0].branch;
        this.status = data[0].status;
        this.percentage = data[0].percentage;
        this.Physics=data[0].Physics;
        this.English=data[0].English;
        this.Chemistry=data[0].Chemistry;
        this.Maths=data[0].Maths;
      }
    });
  }
  submit() {
    let request: any = {
      rollno: this.data.rollno,
      firstname: this.fname,
      lastname: this.lname,
      branch: this.branch,
      Physics:this.Physics,
      Chemistry:this.Chemistry,
      Maths:this.Maths,
      English:this.English
    }
    this.apiservice.update(request).map(data => data).subscribe(data => {
      if (data.result == true) {
        this.errorstatement = data.status;
        setTimeout(() => { this.error = false }, 3000)
      }
      this.dialogRef.close();
      window.location.reload(); 
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}


