import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonItem, IonInput} 
from '@ionic/angular/standalone';
import { UsersModel } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, ReactiveFormsModule, IonItem, 
    FormsModule , IonInput]
})
export class HomePage {
  register: boolean = false;

  login: boolean = false;

  formRegister: FormGroup;

  user: UsersModel = {
    nickname: '',
    email: '',
    password: ''
  };

  //SERVICES
  private readonly userService = inject(UsersService);
  private readonly authService = inject(AuthService);

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.formRegister = this.fb.group({
      nickname: ['',],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  clickRegister() {
    this.register = true;
    this.login = false;
  }

  clickLogin() {
    this.login = true;
    this.register = false;
  }

  getBack() {
    this.login = false;
    this.register = false;
  }

  saveUser() {
   this.formRegister.get('nickname')?.setValidators(Validators.required);
   this.formRegister.get('nickname')?.updateValueAndValidity();
  
   if(this.formRegister.invalid) {
    console.error("ERROR")
   } else {
     this.userService.saveUser(this.formRegister.value).
     pipe(take(1))
     .subscribe({
      next: (response: UsersModel) => {
        this.user = response;
        this.register = false;
        this.login = true;
    },
    error: (error: any) => {
      console.error("Error al guardar el usuario:", error);
    }});
   }
  }

  getUser() {
    this.formRegister.get('nickname')?.clearValidators();
    this.formRegister.get('nickname')?.updateValueAndValidity();
    this.authService.login(this.formRegister.value).subscribe({
      next: () => console.log('Login exitoso:'),
      error: (error) => console.error('Error al obtener el usuario:', error),
    });
  }
}
