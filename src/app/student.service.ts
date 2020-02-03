import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  headers: Headers;

  constructor(private http:HttpClient) {
    this.headers = new Headers();
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        this.headers.append("Access-Control-Allow-Methods", "POST, GET");
        this.headers.append('Access-Control-Allow-Headers', 'application/json');
        this.headers.append('Access-Control-Allow-Credentials', 'true');
   }

  public studentDetails(): Observable<any> {
    return this.http.get<any>("http://139.73.40.133:3000/studentdetails/details");
}
public studentid(rollno): Observable<any> {
  return this.http.get<any>("http://139.73.40.133:3000/studentdetails/detail/"+rollno);
}
public add(request): Observable<any> {
  return this.http.post<any>("http://139.73.40.133:3000/studentdetails/insert", request);
}
public update(request): Observable<any> {
  return this.http.post<any>("http://139.73.40.133:3000/studentdetails/update", request);
}
public delete(rollno): Observable<any> {
  return this.http.get<any>("http://139.73.40.133:3000/studentdetails/delete/"+rollno);
}
}
