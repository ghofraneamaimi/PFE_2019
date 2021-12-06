import { Component, OnInit } from '@angular/core';
import {Dashboard} from '../../_models';

import {ClientService} from '../../_services/client.service';

@Component({
  selector: 'app-download-dashboard',
  templateUrl: './download-dashboard.component.html',
  styleUrls: ['./download-dashboard.component.css']
})
export class DownloadDashboardComponent implements OnInit {
  constructor(private s: ClientService)
  { }
  headElements = ['FileName', 'Dateupload','Download','Delete'];
  t: Dashboard[] ;


  ngOnInit() {
    let id = '5ce5e41f1119063eacb76ffa';
    this.s.getAllDashboard(id).subscribe(
      data => {this.t = data;}
    );
  }
  deleteDash(){

  }
  download(fname): string
  {
return 'http://localhost:3000/dashboard/download/' + fname;
  }

}
