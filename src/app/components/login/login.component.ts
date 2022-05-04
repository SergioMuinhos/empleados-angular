import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  loading = false;
  isLoggedin?: boolean;

  constructor(private router: Router, public authservice: AuthService) { }
  @Output() isLogOut = new EventEmitter<void>();
  ngOnInit(): void {
  }

  logout() {
    this.authservice.logout();
    this.isLogOut.emit();
  }

  onGoogleLogin() {

  }
  async onLogin() {
    console.log("Login->", this.loginForm.value)
    /*const {email, password}=this.loginForm.value;
    try{
      const user = await this.authSvc.login(email, password);
      if(user && user.user.emailVerified){
        this.router.navigate(['/lista-empleados'])
      }
    }catch(error){
      console.log(error)
    }*/
  }

}
