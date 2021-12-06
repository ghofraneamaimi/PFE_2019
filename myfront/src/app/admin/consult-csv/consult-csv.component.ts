import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import {Csv} from '../../_models/csv';
declare var M: any;
@Component({
  selector: 'app-consult-csv',
  templateUrl: './consult-csv.component.html',
  styleUrls: ['./consult-csv.component.css']
})
export class ConsultCsvComponent implements OnInit {
  headElements = ['FileName', 'Dateupload', 'Delete'];
  t: Csv[];
  csv: Csv ;
  constructor(private s: AdminService) { }

  ngOnInit() {
    this.s.getAllCsv().subscribe(
      data => {this.t = data; }
    );
  }

 deleteCsv(e: Csv) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.s.deleteCsv(e.filename).subscribe((res) => {
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  };


}
