import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, user, TwitterAuthProvider} from '@angular/fire/auth'
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
  async login(email : string, password : string) {
    var ok = false;
    await this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('uid',res.user.uid);
        this.getUser(res.user.uid);
        alert("Login Succesful")
        ok = true;

        if(res.user?.emailVerified == true) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/error-anime']);
        }

    }, err => {
      ok = false;
        alert(err.message);
    })
    return ok;
  }

  // register method
  async register(email : string, password : string, username:string) {
    var ok = false;
    await this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.userService.addUser(new IUser("",username,res.user.uid));
      this.sendEmailForVarification(res.user);
      ok = true;
    }, err => {
      alert(err.message);
    })
    return ok;
  }

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('uid');
      localStorage.removeItem('username');
      this.currentUser = undefined;
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
  async googleSignIn() {
    var ok = false;
    await this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      localStorage.setItem('uid',JSON.stringify(res.user.uid));
      this.getUser(res.user?.uid);
      if(this.currentUser === undefined || this.currentUser === null)
      {
        this.userService.addUser(new IUser("",res.user.email.split("@")[0],res.user.uid));
        this.getUser(res.user.uid);
        ok=true;
      }
      this.router.navigate(['']);
    }, err => {
      alert(err.message);
    })
    return ok;
  }

  //sign in with twitter
  async twitterSignIn() {
    return this.fireauth.signInWithPopup(new TwitterAuthProvider).then(res => {

      localStorage.setItem('uid',JSON.stringify(res.user.uid));
      this.getUser(res.user?.uid);
      if(this.currentUser === undefined || this.currentUser === null)
      {
        this.userService.addUser(new IUser("",res.user.email.split("@")[0],res.user.uid));
        this.getUser(res.user.uid);
      }
      this.router.navigate(['']);
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