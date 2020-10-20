import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-help-faq',
  templateUrl: './help-faq.component.html',
  styleUrls: ['./help-faq.component.scss']
})
export class HelpFaqComponent implements OnInit {

  supportForm:FormGroup
  constructor(private apiService:ApiService) {
    this.supportForm = new FormGroup({
      name: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl('', Validators.email),
      description: new FormControl(),
    })
   }

  ngOnInit(): void {

  }

  submitTicket(){
    
  }

}
