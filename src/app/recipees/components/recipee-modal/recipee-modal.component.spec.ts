import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeeModalComponent } from './recipee-modal.component';

describe('RecipeeModalComponent', () => {
  let component: RecipeeModalComponent;
  let fixture: ComponentFixture<RecipeeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RecipeeModalComponent]
});
    fixture = TestBed.createComponent(RecipeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
