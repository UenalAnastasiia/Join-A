import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getAuth, signInAnonymously } from "firebase/auth";
import { AuthenticationService } from 'src/services/authentication.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  error: string;


  constructor(public auth: AuthenticationService, public shared: SharedService) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }


  ngOnInit(): void {
  }


  loginUser() {
    this.auth.login(this.formLogin.value)
      .then(() => {
        window.location.href = '/summary';
      })
      .catch(error => this.error = error);
  }


  signInWithGoogle() {
    this.auth.loginWithGoogle()
      .then(() => {
        this.auth.getLoggedUser();
        window.location.href = '/summary';
      })
      .catch(error => this.error = error);
  }


  guestLogin() {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        window.location.href = '/summary';
      })
      .catch((error) => {
        this.error = error;
      });
  }
}