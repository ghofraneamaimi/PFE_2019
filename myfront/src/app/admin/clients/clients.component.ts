import { Component, OnInit,HostListener } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../shared/client.service';
import { Client } from "../../_models/client";
var M: any;
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [ClientService]
})
export class ClientsComponent implements OnInit {
  contactForm: FormGroup;
disabledSubmitButton: boolean = true;
optionsSelect: Array<any>;

  @HostListener('input') oninput() {

  if (this.contactForm.valid) {
    this.disabledSubmitButton = false;
    }
  }

  clt: Client;
  nemail = true;
  constructor(private fb: FormBuilder, private clientService: ClientService) 
  {
    this.clientForm= fb.group({
      name: ['', Validators.required],
      usename: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    
    });
    this.contactForm = fb.group({
    'contactFormName': ['', Validators.required],
    //'contactFormTOEmail': ['', Validators.compose([Validators.required, Validators.email])],
    'contactFormTOEmail': ['', Validators.required],
    'contactFormSubjects': ['', Validators.required],
    'contactFormMessage': ['', Validators.required],
    'contactFormCopy': [''],
    });
  }
  mail() {
    this.clientService.sendMessage(this.contactForm.value).subscribe(() => {
      alert('Your message has been sent.');
      this.contactForm.reset();
      this.disabledSubmitButton = true;
    }, error => {
      console.log('Error', error);
    });
  }
  ngOnInit() {
    this.resetForm();
    this.refreshClientList();
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
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.clientService.selectedClient = {
      _id: "",
      name: "",
      username: "",
      password: "",
      phone: "",
      email:"",
     // role: isClient,
      token: "",
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.clientService.postClient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshClientList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.clientService.putClient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshClientList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshClientList() {
    this.clientService.getClientList().subscribe((res) => {
      this.clientService.clients = res as Client[];
    });
  }

  onEdit(emp: Client) {
    this.clientService.selectedClient = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.clientService.deleteClient(_id).subscribe((res) => {
        this.refreshClientList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
