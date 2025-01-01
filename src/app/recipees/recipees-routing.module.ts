import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeesComponent } from './recipees.component';


const routes: Routes = [
  {
    path: '',
    component: RecipeesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeesPageRoutingModule {}
