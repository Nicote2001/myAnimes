import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { LoginModal } from 'src/app/objects/ModalObect/login-modal.model';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { faSquareXmark, faX, faXmark } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password : string = '';
  result: LoginModal;
  faXmark = faXmark;

  constructor(private auth : AuthService, public modalRef: MdbModalRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  async login() 
  {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    var isLogged = await this.auth.login(this.email,this.password);

    if(isLogged)
    {
      this.closeWithLogin();
    }
    
    this.email = '';
    this.password = '';

  }

  closeWithLogin(){
    this.modalRef.close(false);
  }

  async closeWithGoogle(){
    var isLogged=false;
    isLogged = await this.auth.googleSignIn();
    if(isLogged){
      this.modalRef.close(false);
    }
  }

  closeWithTwitter(){
    alert('dont work yet')
    this.auth.twitterSignIn();
    this.modalRef.close(false);
  }

  closeWithRegister(){
    this.modalRef.close(true);
  }
 
}
