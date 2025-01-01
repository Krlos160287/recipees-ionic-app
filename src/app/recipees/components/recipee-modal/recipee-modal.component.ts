// import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
// // import { MenuItem, SharedModule } from 'primeng/api';
// // import { Table, TableModule } from 'primeng/table';
// // import { take } from 'rxjs';
// // import { RecipeesService } from 'src/app/core/services/recipees.service';
// // import { RecetaModel, Producto } from '../../recipee.model';
// // import { InputTextareaModule } from 'primeng/inputtextarea';
// // import { DropdownModule } from 'primeng/dropdown';
// // import { ButtonModule } from 'primeng/button';
// // import { MultiSelectModule } from 'primeng/multiselect';

// // import { StepsModule } from 'primeng/steps';

// export interface Categoria {
//   categoria: string;
//   ingredientes: Ingredientes[];
// }

// export interface Ingredientes {
//   nombre: string;
// }

// interface Seleccion {
//   categoria: string;
//   ingredientesSeleccionados: string[];
// }

// @Component({
//     selector: 'app-recipee-modal',
//     templateUrl: './recipee-modal.component.html',
//     styleUrls: ['./recipee-modal.component.scss'],
//     standalone: true,
//     imports: [FormsModule,]
// })
// export class RecipeeModalComponent implements OnInit{
//   // @ViewChild('TablaIngredientes') tableIngredientes: Table | undefined;

//   // @Input() recipeeEdit!: RecetaModel;
//   @Input() edit: boolean = false;

//   @Output() closeDialogEvent = new EventEmitter<void>();

//   // items: MenuItem[] = [];

//   activeIndex: number = 0;

//   categories: Categoria[] = [];

//   ingredientes: any[] = [];

//   productos: Producto[] = [];

//   recipee: RecetaModel = {
//     nombre: '',
//     products: [],
//     steps: '',
//     createdBy: ''
//   };

//   formRecipees!: FormGroup;

//   selecciones: Seleccion[] = [];

//   udsMedida: string[] = [
//     "gramos","ml"
//   ]

//   constructor(
//     private fb: FormBuilder,
//     private recipeesService: RecipeesService,
//   ) {
//     this.formRecipees = this.fb.group({
//       selectedIngredients: ['',]
//     });
//   }
//   ngOnInit(): void {
//     this.getCatIng();

//     this.items = [
//       {
//           label: 'Ingredientes',
//       },
//       {
//           label: 'Cantidades',
//       },
//       {
//           label: 'Detalles y Confirmación',
//       }
//   ];
//   }

//   getCatIng() {
//     this.recipeesService.getAll().pipe(take(1))
//     .subscribe({
//       next: resp => {
//         this.categories = resp;
//       },
//       error: (err) => {
//         console.error(err);
//       }
//     });
//   }

//   getIngredientesByCategoria(categoria: Categoria): any[] {
//     return categoria.ingredientes.map(ingrediente => ({ label: ingrediente.nombre, value: ingrediente.nombre }));
//   }

//   selectsOptions(event: any, categoria: string) {
//     const ingredientesSeleccionados = event.value;

//     if(!this.edit) {
//       const seleccionExistente = this.selecciones.find(sel => sel.categoria === categoria);
  
//       if (seleccionExistente) {
//         seleccionExistente.ingredientesSeleccionados = ingredientesSeleccionados;
//       } else {
//         this.selecciones.push({ categoria, ingredientesSeleccionados });
//       }
//     } else {
//       let seleccionExistente;

//       let filtro = ingredientesSeleccionados.forEach((elem: string) => {
//         seleccionExistente = this.recipeeEdit.products.find(sel => sel.nombre === elem);
//       })
//       if(seleccionExistente) {
//         return;
//       } else {
//         this.selecciones.push({categoria, ingredientesSeleccionados});
//       }
//     }
//   }

//   getIngredientsList() {
//     if (this.selecciones.length > 0 ) {
//       this.selecciones.forEach((seleccion) => {
//         seleccion.ingredientesSeleccionados.forEach((nombre) => {
//           this.ingredientes.push(nombre);
//           this.productos.push({ nombre: nombre, cantidad: undefined, unidadMedida: undefined });
//         });
//       });
//     }
//   }  

//   previousStep() {
//     if(this.activeIndex === 1) {
//       this.selecciones = [];
//       this.ingredientes = [];
//       this.productos = [];
//     }
//     this.activeIndex --;
//   }
  
//   nextStep() {
//     if(!this.edit) {
//       this.forwardPageCreate();
//     } else {
//       this.forWardPageEdit();
//     }
//   }

//   forWardPageEdit() {
//     if(this.activeIndex == 0 ) {
//       const supplies = this.recipeeEdit.products;
//       this.getIngredientsList();
//       if(this.productos.length == 0) {
//         this.productos = supplies;
//       } else {
//         this.productos = this.productos.concat(supplies);
//       }
//       this.activeIndex++;
//     } else if (this.activeIndex == 1 ) {
//       this.recipee = this.recipeeEdit;
//       this.productos = this.tableIngredientes!.value;
//       this.activeIndex++;
//     } else {
//       this.activeIndex++;
//     }
//   }

//   forwardPageCreate() {
//     if(this.activeIndex === 0 && this.selecciones.length == 0) {
//       console.log("ERROR");
//     } else if (this.activeIndex === 0 && this.selecciones.length > 0) {
//       this.activeIndex++;
//       this.getIngredientsList();
//     } else if (this.activeIndex == 1) {
//       this.productos = this.tableIngredientes!.value;
//       this.activeIndex++;
//     }
//     else {
//       this.activeIndex ++;
//     }
//   }

//   confirm() {
//     this.recipee.products = this.productos;

//     if(!this.edit) {
//       this.recipeesService.saveRecipee(this.recipee).pipe(take(1))
//       .subscribe({
//         next: () => {
//           this.closeDialogEvent.emit();
//           this.activeIndex = 0;
//           this.selecciones = [];
//           this.ingredientes = [];
//           this.productos = [];
//         },
//         error: console.error
//       });
//     } else {
//       this.recipeesService.updateRecipee(this.recipee).pipe(take(1))
//       .subscribe({
//         next: () => {
//           this.closeDialogEvent.emit();
//           this.activeIndex = 0;
//           this.selecciones = [];
//           this.ingredientes = [];
//           this.productos = [];
//         },
//         error: console.error
//       });
//     }
//   }

//   closeModal() {
//     this.activeIndex = 0;
//     this.selecciones = [];
//     this.ingredientes = [];
//     this.productos = [];
//     this.closeDialogEvent.emit();
//   }

//   quitIngredient(event: Producto) {
//     let filtro = this.productos.filter((x) => x.nombre !== event.nombre);
//     if(filtro) {
//       this.productos = filtro;
//     }
//   }
// }
