import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDialogComponent } from './cadastro-dialog.component';

describe('CadastroDialogComponent', () => {
  let component: CadastroDialogComponent;
  let fixture: ComponentFixture<CadastroDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroDialogComponent]
    });
    fixture = TestBed.createComponent(CadastroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
