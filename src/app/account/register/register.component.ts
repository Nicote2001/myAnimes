import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { faX, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';
  userName : string = '';
  faXmark = faXmark;

  constructor(private auth : AuthService, public modalRef: MdbModalRef<RegisterComponent>) { }

  ngOnInit(): void {
  }

  async register() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    if(this.userName == '') {
      alert('Please enter username');
      return;
    }

    var isLogged = await this.auth.register(this.email,this.password, this.userName);
    
    this.email = '';
    this.password = '';
    this.userName = '';

    if(isLogged){
      this.modalRef.close(true);
    }

  }

  closeFromLogin(){
    this.modalRef.close(true);
  }

}