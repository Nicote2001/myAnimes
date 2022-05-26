import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, user} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { IUser } from 'src/app/objects/DataBaseObject/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser : IUser;

  constructor(private fireauth : AngularFireAuth, private router : Router, private userService: UserService) { }

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('uid',res.user.uid);
        this.getUser(res.user.uid);
        console.log(localStorage.getItem('username'));
        alert("Login Succesful")
        if(res.user?.emailVerified == true) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/error-anime']);
        }

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  // register method
  register(email : string, password : string, username:string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.userService.addUser(new IUser("",username,res.user.uid));
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('uid');
      localStorage.removeItem('username');
      this.currentUser = undefined;
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/varify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }

  // email varification
  sendEmailForVarification(user : any) {
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
      this.getUser(res.user?.uid);

    }, err => {
      alert(err.message);
    })
  }

  async getUser(uid:string)
  {
    var results = await this.userService.getUserByUid(uid);
    this.currentUser = results[0];
    localStorage.setItem('username',this.currentUser.username);
  }

}