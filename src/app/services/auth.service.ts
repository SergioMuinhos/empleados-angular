import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth } from 'firebase/app/dist/auth';
import { User } from 'firebase/app/dist/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(public afAuth: AngularFireAuth) { }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password).then(
        res => {
          this.isLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(res.user))  
          return true;   
        }
      )
      console.log("RESULT LOGIN",result)
      return result;
    } catch (error) {
      console.log("Login Error", error);
      return null;
    }
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(
        res => {
          this.isLoggedIn = true;
          //localStorage.setItem('user', JSON.stringify(res.user))
        }
      )
      console.log("RESULT",result)
      return result;
    } catch (error) {
      console.log("Register Error", error)
      return null;
    }

  }

  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user')
    } catch (e) {
      console.log(e)
    }
    //redirigir al login 
  }

  getCurrentUser(){
    return localStorage.getItem('user')
  }


}
