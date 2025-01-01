import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { RecetaModel } from './recipee.model';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-recipees',
    templateUrl: './recipees.component.html',
    styleUrls: ['./recipees.component.scss'],
    standalone: true,
    imports: []
})
export class RecipeesComponent {

  display: boolean = false;

  displayEdit: boolean = false;

  recipees: RecetaModel[] = [];

  selectedRecipee!: RecetaModel;

  constructor(
    private authService: AuthService,
    private router: Router,
    // private recipeesService: RecipeesService
  ) {}

  ngOnInit(): void {
    // this.getRecipeesByUserName();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  showModal() {
    this.display = true;
  }

  // getRecipeesByUserName() {
  //   this.recipeesService.getRecipeesByUser(localStorage.getItem('userMail')!).pipe(take(1)).subscribe({
  //     next: (resp:any) => {
  //       this.recipees = resp;
  //     },
  //     error: console.error
  //   })
  // }
  
  // closeDialog() {
  //   this.display = false;
  //   this.displayEdit = false;
  //   this.getRecipeesByUserName();
  // }

  editRecipee(recipee: RecetaModel) {
    this.selectedRecipee = recipee;
    this.displayEdit = true;
  }
  
  // deleteRecipee(recipee: RecetaModel) {
  //   this.recipeesService.deleteRecipee(recipee).pipe(take(1))
  //   .subscribe({
  //     next: () => {
  //       this.getRecipeesByUserName();
  //     },
  //     error: console.error
  //   });
  // }

  // getRecipeePDF(recipee: RecetaModel) {
  //   this.recipeesService.getRecipeePDF(recipee).pipe(take(1))
  //   .subscribe({
  //     next: console.log,
  //     error: console.error
  //   });
  // }
}

