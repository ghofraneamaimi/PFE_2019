import { Component, OnInit } from '@angular/core';
import { Client } from '../../_models';

import { ClientService } from '../../shared/client.service';
declare var M: any;
@Component({
  selector: 'app-consult-account',
  templateUrl: './consult-account.component.html',
  styleUrls: ['./consult-account.component.css'],
  providers: [ClientService]
})
export class ConsultAccountComponent implements OnInit {
  constructor(private clientService: ClientService) {}

  c: Client;

  ngOnInit() {
    let id = '5ce5e41f1119063eacb76ffa';
    this.clientService.getMyInfo(id).subscribe(data => {
      this.c = data;
    });
  }

  updatePassword(password: string)
  {
    //const pass = this.c.password;

    this.c.password = password;
    // this.c.password = this.password1;
    this.clientService.putPassword(this.c).subscribe(data => {
      this.c = data;
    });
  }

  updateMdp(){
    this.c.password = this.pwd1;
    this.clientService.putPassword(this.c).subscribe(data => {
      this.c = data;
    });
  }
  pwd1 : string='';
  pwd2 : string='';

}
