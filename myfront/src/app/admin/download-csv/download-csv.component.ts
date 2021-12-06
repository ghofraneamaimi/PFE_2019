import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import {Csv} from '../../_models';
import { Client } from '../../_models';

@Component({
  selector: 'app-download-csv',
  templateUrl: './download-csv.component.html',
  styleUrls: ['./download-csv.component.css']
})
export class DownloadCsvComponent implements OnInit {
  headElements = ['ClientName', 'ClientUserName', 'ClientCSVFiles'];
 csvs: Csv[];
  ncsv = true;
 c: Client[];
 id = '5c94e8295f6ca22a20862431';
  constructor(private s: AdminService) { }


  ngOnInit() {
    this.s.getAll().subscribe(
      data => {this.c = data; });
  }
  onSubmit(csvs: Csv) {
  this.ncsv = !this.ncsv ;
  this.s.getAllCsvClient(this.id).subscribe(
    data => {this.csvs = data; });
}
 download(fname): string
  {
return 'http://localhost:3000/csv/download/' + fname;

  }
}
