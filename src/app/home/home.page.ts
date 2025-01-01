import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonItem, IonInput} 
from '@ionic/angular/standalone';
import { UsersModel } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { take, tap } from 'rxjs';
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
    this.formRegister.reset();
  }

  saveUser() {
    if (this.isFormInvalid()) {
      console.error("Formulario inválido.");
      return;
    }

    this.userService.saveUser(this.formRegister.value).pipe(
      take(1),
      tap((response: UsersModel) => {
        this.user = response;
        this.register = false;
        this.login = true;
        console.log("Usuario guardado exitosamente:", response);
      })
    ).subscribe({
      error: (error) => {
        console.error("Error al guardar el usuario:", error);
      }
    });
  }

  getUser() {
    this.formRegister.get('nickname')?.clearValidators();
    this.formRegister.get('nickname')?.updateValueAndValidity();
    this.authService.login(this.formRegister.value).subscribe({
      next: () => console.log('Login exitoso:'),
      error: (error) => console.error('Error al obtener el usuario:', error),
    });
  }

  private isFormInvalid(): boolean {
    this.formRegister.get('nickname')?.setValidators(Validators.required);
    this.formRegister.get('nickname')?.updateValueAndValidity();
    return this.formRegister.invalid;
  }
}
