import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/*import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';*/

import { Client } from '../_models/client';

@Injectable()
export class ClientService {
  selectedClient: Client;
  clients: Client[];
  baseURL = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) { }

  postClient(emp: Client) {
    return this.http.post(this.baseURL, emp);
  }

  getClientList() {
    return this.http.get(this.baseURL);
  }

  putClient(emp: Client) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteClient(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  getMyInfo(idClient): Observable<Client> {
    return this.http.get<Client>(this.baseURL + '/' + idClient);
  }
 // putPassword(password: string) {
  putPassword(client: Client) {
    return this.http.put(this.baseURL + '/5c94e8295f6ca22a20862431', client);
  }

  sendMessage(messageContent: any) {
    return this.http.post('http://localhost:3000/email/send-email',
    JSON.stringify(messageContent),
    { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }
}
