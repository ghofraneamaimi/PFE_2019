import { Component, OnInit } from '@angular/core';
import {Csv} from '../../_models';

import {ClientService} from '../../_services/client.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.css']
})
export class UploadCsvComponent implements OnInit {


  constructor(private s: ClientService, private http: HttpClient)
  { }
  headElements = ['FileName', 'Dateupload'];
  t: Csv[] ;
//action = 'http://localhost:3000/csv/uploaddata';
id = '5c94e8295f6ca22a20862431';
fileData: Csv = null;

  ngOnInit() {
   // let id='5c94e8295f6ca22a20862431';
    this.s.getAllCsv(this.id).subscribe(
      data => {
        console.log(data);
        this.t = data;
      }
    );

    this.csv.client_id = this.id;
  }

fileProgress(fileInput: any) {
  this.fileData = <Csv>fileInput.target.files[0];
}


validArticlePackage()
{
  let formdata = new FormData();
  console.log(this.file);

  for (let i=0; i<this.file.length; i++)
  {
    formdata.append('file', this.file[i]);
  }

  formdata.append('nomdoc', this.csv.nomdoc);
  formdata.append('taille', this.csv.taille);
  formdata.append('client_id', this.csv.client_id);

  formdata.append('package', 'article');

  this.http.post<any>('http://localhost:3000/csv_valid/upload', formdata)
    .subscribe(res => {
      console.log(res);
      if (res.message) {alert('your file is valid');}
      if (res.error) {alert('Erreur !!' + res.error);}

     // alert('SUCCESS !!');
      //
      //this.ngOnInit();
    });
}
validVentePackage()
{
  let formdata = new FormData();
  console.log(this.file);

  for (let i=0; i<this.file.length; i++)
  {
    formdata.append('file', this.file[i]);
  }

  formdata.append('nomdoc', this.csv.nomdoc);
  formdata.append('taille', this.csv.taille);
  formdata.append('client_id', this.csv.client_id);

  formdata.append('package', 'vente');

  this.http.post<any>('http://localhost:3000/csv_valid/upload', formdata)
    .subscribe(res => {
      console.log(res);
      if (res.message) {alert('your file is valid');}
      if (res.error) {alert('Erreur !!' + res.error);}

     // alert('SUCCESS !!');
      //
      //this.ngOnInit();
    });
}
validStockPackage()
{
    let formdata = new FormData();
    console.log(this.file);

    for (let i=0; i<this.file.length; i++)
    {
      formdata.append('file', this.file[i]);
    }

    formdata.append('nomdoc', this.csv.nomdoc);
    formdata.append('taille', this.csv.taille);
    formdata.append('client_id', this.csv.client_id);

    formdata.append('package', 'stock');

    this.http.post<any>('http://localhost:3000/csv_valid/upload', formdata)
      .subscribe(res => {
        console.log(res);
        if (res.message) {alert('your file is valid');}
        if (res.error) {alert('Erreur !!' + res.error);}

       // alert('SUCCESS !!');
        //
        //this.ngOnInit();
      });
}
validfournisseurPackage()
{
  let formdata = new FormData();
  console.log(this.file);

  for (let i=0; i<this.file.length; i++)
  {
    formdata.append('file', this.file[i]);
  }

  formdata.append('nomdoc', this.csv.nomdoc);
  formdata.append('taille', this.csv.taille);
  formdata.append('client_id', this.csv.client_id);

  formdata.append('package', 'fournisseur');

  this.http.post<any>('http://localhost:3000/csv_valid/upload', formdata)
    .subscribe(res => {
      console.log(res);
      if (res.message) {alert('your file is valid');}
      if (res.error) {alert('Erreur !!' + res.error);}

     // alert('SUCCESS !!');
      //
      //this.ngOnInit();
    });
}

csv  : Csv = new Csv();
file : any;

onFileChange(event)
{
  this.file=event.target.files;
}

save()
{
  let formdata = new FormData();
  console.log(this.file);

  for (let i=0; i<this.file.length; i++)
  {
    formdata.append('myFiles', this.file[i]);
  }

  formdata.append('nomdoc', this.csv.nomdoc);
  formdata.append('taille', this.csv.taille);
  formdata.append('client_id', this.csv.client_id);


  this.http.post('http://localhost:3000/csv/uploaddata', formdata)
    .subscribe(res => {
      console.log(res);
      alert('SUCCESS !!');
      //
      this.ngOnInit();
    });

}

}
