import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  passcount:number=0;
  failcount:number=0;
totalcount:number=0;
  studentdata: any;
  deleteboolean:boolean;
  rollno:number;
  constructor() { }
  public SetPassCount(data: any) {
    this.passcount = data;
}
public GetPassCount() {
    return this.passcount;
}
public SetFailCount(data: any) {
  this.failcount = data;
}
public GetFailCount() {
  return this.failcount;
}
public SetTotalCount(data: any) {
  this.totalcount = data;
}
public GetTotalCount() {
  return this.totalcount;
}
public SetData(data: any) {
  this.studentdata = data;
}
public GetData() {
  return this.studentdata;
}
public SetDeleteboolean(data:any){
  this.deleteboolean=data;
}
public GetDeleteboolean()
{
  return this.deleteboolean;
}

public SetRollno(data:number){
  this.rollno=data;
  
}
public GetRollno()
{
  return this.rollno;
}
}
