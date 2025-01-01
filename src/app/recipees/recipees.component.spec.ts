import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeesComponent } from './recipees.component';

describe('RecipeesComponent', () => {
  let component: RecipeesComponent;
  let fixture: ComponentFixture<RecipeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RecipeesComponent]
});
    fixture = TestBed.createComponent(RecipeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
