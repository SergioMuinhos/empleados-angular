import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  isSigned = false;
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private router: Router,
    private toastr: ToastrService,
    public authservice: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSigned = true;
    } else {
      this.isSigned = false;
    }
  }

  async onRegister() {
    const { email, password } = this.registerForm.value;
    if (await this.authservice.register(email, password) != null) {
      this.router.navigate(['/login'])
    } else {
      //  console.log('Error al registrar Usuario')
      this.toastr.error("Usuario ya Registrado", "Ha ocurrido un Error")
    }

    // console.log("Register ->",this.registerForm.value)
  }
}
