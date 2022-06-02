import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimeDetailsApiCallerService } from '../ApiCallerService/animeDetails.api-caller.service';
import { GlobalPagesAnimesApiCallerService } from '../ApiCallerService/globalPagesAnimes.api-caller.service';
import { CommonService } from '../Shared/common.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private http: HttpClient,private api:GlobalPagesAnimesApiCallerService, private formBuilder: FormBuilder, private	 commonService:CommonService) { 
    this.form = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message
    });
  }

  form: FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  message: FormControl = new FormControl("", [Validators.required, Validators.maxLength(256)]);
  ngOnInit(): void {
  }

  

  sendMail()
  {
    if(this.form.get("email").value == undefined || this.form.get("email").value == "")
    {
      alert('email Required');
    }

    var formData: any = new FormData();
    formData.append("name", this.form.get("name").value);
    formData.append("email", this.form.get("email").value);
    formData.append("message", this.form.get("message").value);

    this.sendMailapi(formData);
  }

  sendMailapi(item:any)
  {
    this.http.post<any>('https://formspree.io/f/mayvvgeb',item).subscribe(data =>{
      if(data.ok)
      {
        this.commonService.openErrorComponent("Your message or request has been sent.", true)
      }
    })

  }

}
