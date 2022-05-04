import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private router: Router, 
    private toastr: ToastrService,
    public authservice: AuthService) { }
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
    const { email, password } = this.loginForm.value;
   // console.log("LOGIN", await this.authservice.login(email, password))
    if (await this.authservice.login(email, password) != null) {
      this.router.navigate(['/list-empleados'])
    } else {
      console.log("Error")
      this.toastr.error("El usuario no se encuentra", "Ha ocurrido un Error")
    }



    // console.log("Login->", this.loginForm.value)
    //console.log("Logeado correctamente");

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
