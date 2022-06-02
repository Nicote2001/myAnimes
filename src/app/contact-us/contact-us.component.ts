import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnimeDetailsApiCallerService } from '../ApiCallerService/animeDetails.api-caller.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private http: HttpClient,private api:AnimeDetailsApiCallerService) { }

  email : string = 'oui';
  subject : string = '';
  message : string = '';
  ngOnInit(): void {
  }

  sendMail()
  {
    var item = this.api.getAnimeById("naruto");
    console.log("salut");
    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.subject == '') {
      alert('Please enter subject');
      return;
    }

    if(this.message == '') {
      alert('Please enter message');
      return;
    }
    var formData: any = new FormData();
      formData.append("name", this.email);
      formData.append("email", this.email);
      formData.append("message", this.message);
  }

}
