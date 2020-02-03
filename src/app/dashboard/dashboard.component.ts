import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  value:any;
  cutoff:"";
  isdashboard:boolean=false;
 
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
  
  };
  passcount:number;
  failcount:number;
  totalcount:number;
  pcount:number=0;
  fcount:number=0;
  tcount:number=0;
  passpercent:string;
  failpercent:string;
  ppercent:string;
  fpercent:string;
  lineChartData: { data: any[]; label: string; }[];
  BarChartData: { data: any[]; label: string; }[];
  studentdata:any[]=[];
  status:any[]=[];
  constructor(public shared:SharedService, private snackBar: MatSnackBar) { 
    
    this.lineChartData = [
    
      { data: [], label: 'Pass' },
      { data: [], label: 'Fail' },
      ]
      this.BarChartData = [
    
        { data: [], label: 'Pass' },
        { data: [], label: 'Fail' },
        ]
    
  }
  
  ngOnInit() {
    this.isdashboard=false;
    this.passcount=this.shared.GetPassCount();
    this.failcount=this.shared.GetFailCount();
    this.totalcount=this.shared.GetTotalCount();
    this.passpercent=((this.passcount*100)/this.totalcount).toFixed(2);
    this.failpercent=((this.failcount*100)/this.totalcount).toFixed(2)
    const data0 = [ this.passpercent,0,100];
const data1 = [ this.failpercent,0,100]
this.studentdata=this.shared.GetData();
console.log(this.studentdata);
this.lineChartData[0].data = data0;
this.lineChartData[1].data = data1;


  }
 
    public mbarChartLabels:string[] = ['Pass Vs Fail'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
  
    public barChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(105,159,177,1)',
      // borderColor: 'rgba(105,159,177,1)',
      // pointBackgroundColor: 'rgba(105,159,177,1)',
      // pointBorderColor: '#fafafa',
      // pointHoverBackgroundColor: '#fafafa',
      // pointHoverBorderColor: 'rgba(105,159,177)'
    },
    { 
      backgroundColor: 'rgba(77,20,96,1)',
      // borderColor: 'rgba(77,20,96,1)',
      // pointBackgroundColor: 'rgba(77,20,96,1)',
      // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(77,20,96,1)'
    }
  ];
    submit()
    {
      this.fcount=0;
      this.tcount=0;
      this.pcount=0;
      this.BarChartData[0].data =[];
      this.BarChartData[1].data =[];
      this.status=[];
this.value=this.cutoff;
console.log(this.value);
if(this.value==undefined||this.value=='')
{

this.openSnackBar("Not a valid value? Please enter Cuttoff","");
}
else{
this.studentdata.forEach(element => {
  let request={
    status:element.percentage<this.value?"Fail" :"Pass"
  }
  this.status.push(request);
 
});
console.log(this.status);
this.status.forEach(data => {
  this.tcount+=1;
 
  if(data.status=="Pass")
  { 

    this.pcount+=1;
 
  }
  else
  {
    this.fcount+=1;
  }
})
this.ppercent=((this.pcount*100)/this.tcount).toFixed(2);
this.fpercent=((this.fcount*100)/this.tcount).toFixed(2);
const data2 = [ this.ppercent,0,100];
const data3 = [ this.fpercent,0,100]
this.BarChartData[0].data = data2;
this.BarChartData[1].data = data3;
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
