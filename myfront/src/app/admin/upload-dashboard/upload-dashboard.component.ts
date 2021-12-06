import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/_models/client';
import { AdminService } from 'src/app/_services/admin.service';
import { Dashboard } from 'src/app/_models/dashboard';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-upload-dashboard',
  templateUrl: './upload-dashboard.component.html',
  styleUrls: ['./upload-dashboard.component.css']
})
export class UploadDashboardComponent implements OnInit {

  constructor(private s: AdminService, private http: HttpClient) { }
  headElements = ['ClientName', 'ClientUserName', 'UploadDashboardFile'];
  c: Client[];
  id = '5ce5e41f1119063eacb76ffa';
  fileData: Dashboard = null;
  ndash = true;
  clt : Client; //= new Client();
  ngOnInit() {
    this.s.getAll().subscribe(
      data => {this.c = data; }
      );
      this.dashboard.client_id=this.id;
  }

  fileProgress(fileInput: any) {
    this.fileData = <Dashboard>fileInput.target.files[0];
  }
  onSubmit() {
    this.ndash = !this.ndash ;
    this.clt = this.s.getSelectedClient();
    console.log(this.clt);
   //this.s.postDashboard(this.id);
  }


  select(e: Client)
  {
    this.clt=e;
    /*
    this.ndash = !this.ndash ;
    this.s.setSelectedClient(e);
    console.log(e);
    */
  }

  dashboard  : Dashboard = new Dashboard();
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

  formdata.append('nomdash', this.dashboard.nomdash);
  formdata.append('taille', this.dashboard.taille);
  //formdata.append('client_id', this.dashboard.client_id);
  formdata.append('client_id', this.clt._id);

  this.http.post('http://localhost:3000/dashboard/uploaddata', formdata)
    .subscribe(res => {
      console.log(res);
      alert('SUCCESS !!');
      //
      this.ngOnInit();
    })

}

}
