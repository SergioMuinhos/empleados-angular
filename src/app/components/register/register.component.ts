import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  isSigned=false;
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor( public authservice: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')!==null){
      this.isSigned=true;
    }else{
      this.isSigned=false;
    }
  }

  async onRegister(){
    const {email, password}= this.registerForm.value;
    await this.authservice.register(email,password);

   // console.log("Register ->",this.registerForm.value)
  }
}
