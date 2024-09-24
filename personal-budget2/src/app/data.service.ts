import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
//import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: any = null; // This will store the data from the backend

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http.get('http://localhost:3000/budget').pipe(
        map((res: any) => {
          this.data = res.myBudget; // Cache the data for future use
          return this.data;
        })
      );
    }
  }
}
