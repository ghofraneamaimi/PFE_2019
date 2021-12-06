import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Client} from '../_models/client';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    baseUrl = 'http://localhost:3000';
    getAll() {
      return this.http.get<Client[]>(this.baseUrl + '/clients');
  }
    getById(id: number) {
       return this.http.get<Client>(this.baseUrl + '/clients/${id}');
    }






}
