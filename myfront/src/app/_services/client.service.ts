import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

import { Client } from '../_models';
import { Csv } from '../_models';
import { Dashboard } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
  baseUrl = 'http://localhost:3000';
  // /clients/5c94e8295f6ca22a20862431';

  constructor(private http: HttpClient) {}

  getMyInfo(idClient): Observable<Client> {
    return this.http.get<Client>(this.baseUrl + '/clients/' + idClient);
  }

  getAllCsv(idClient): Observable<Csv[]> {
    return this.http.get<Csv[]>(this.baseUrl + '/csv/' + idClient);
  }

  /*postCsv(idClient){
  //const csv = new Csv();
  this.http.post(this.baseUrl + '/csv' , Csv ).subscribe(data => {
    console.log(data);
    alert('SUCCESS !!');
  });
  }*/

  getAllDashboard(idClient): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.baseUrl + '/dashboard/' + idClient);
  }

  validateCsv(csv: Csv)
  {
    this.http.post(this.baseUrl+ '/csv/upload', csv).subscribe(res => {
      console.log(res);
      alert('SUCCESS !!');
  });
}
 ventePackage(csv: Csv){
  {
    this.http.post(this.baseUrl+ 'csv_valid/upload', csv).subscribe(res => {
      console.log(res);
      alert('SUCCESS !!');
  });
 }
}
articlePackage(){

 }
 commandePackage()
 {

 }
 stockPackage(){

 }

}
