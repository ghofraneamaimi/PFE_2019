import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../_models';
import { Csv } from '../_models';
import { Dashboard } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  baseUrl = 'http://localhost:3000';
  selectedClient: Client;
  constructor(private http: HttpClient) {}

  getAllCsv(): Observable<Csv[]> {
      return this.http.get<Csv[]>(this.baseUrl + '/csv/' );
    }


    getAll() {
      return this.http.get<Client[]>(this.baseUrl + '/clients');
  }
  getAllCsvClient(idClient): Observable<Csv[]> {
    return this.http.get<Csv[]>(this.baseUrl + '/csv/' + idClient);
  }

  setSelectedClient(c: Client) {
    this.selectedClient = c;
  //  this.selectedClient.nom = c.nom;
    console.log('list');
  }

  getSelectedClient(): Client {
    return this.selectedClient;
  }

  postDashboard(idClient){
    //const csv = new Csv();
    this.http.post(this.baseUrl + '/dashboard' , Dashboard ).subscribe(data => {
      console.log(data);
      alert('SUCCESS !!');
    });
  }

  deleteCsv(_id: string) {
    return this.http.delete(this.baseUrl + '/csv/delete' + `/${_id}`);
  }
}
 // downloadCSV(){}
