import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, IonIcon} 
from '@ionic/angular/standalone';

import { RecetaModel } from '../models/recipee.model';
import { AuthService } from '../services/auth.service';
import { Observable, of, take } from 'rxjs';
import { RecipeesService } from '../services/recipees.service';
import { AsyncPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import {pencilOutline, trashOutline, documentAttachOutline} from 'ionicons/icons';

@Component({
    selector: 'app-recipees',
    templateUrl: './recipees.component.html',
    styleUrls: ['./recipees.component.scss'],
    standalone: true,
    imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonCard, IonCardHeader,
       IonCardTitle, IonCardContent, AsyncPipe, IonIcon]
})
export class RecipeesComponent implements OnInit {

  display: boolean = false;

  displayEdit: boolean = false;

  recipees: RecetaModel[] = [];

  selectedRecipee!: RecetaModel;

  //SERVICES
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly recipeesService = inject(RecipeesService);

  recipees$: Observable<RecetaModel[] | null> = new Observable<RecetaModel[] | null>();

  constructor() {
    addIcons({pencilOutline, trashOutline, documentAttachOutline});
  }

  ngOnInit(): void {
    this.recipees$ = this.getRecipeesByUserName();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  showModal() {
    this.display = true;
  }

  private getRecipeesByUserName(): Observable<any> {
    const userMail = localStorage.getItem('userMail')!;
    return this.recipeesService.getRecipeesByUser(userMail);
  }
  
  // closeDialog() {
  //   this.display = false;
  //   this.displayEdit = false;
  //   this.getRecipeesByUserName();
  // }

  editRecipee(recipee: RecetaModel) {
    this.selectedRecipee = recipee;
    this.displayEdit = true;
  }
  
  deleteRecipee(recipee: RecetaModel) {
    this.recipeesService.deleteRecipee(recipee).pipe(take(1))
    .subscribe({
      next: (updatedRecipees) => {
        this.recipees$ = of(updatedRecipees);
      },
      error: console.error
    });
  }

  // getRecipeePDF(recipee: RecetaModel) {
  //   this.recipeesService.getRecipeePDF(recipee).pipe(take(1))
  //   .subscribe({
  //     next: console.log,
  //     error: console.error
  //   });
  // }
}

