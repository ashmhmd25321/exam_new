import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperInstructionsComponent } from './paper-instructions.component';

describe('PaperInstructionsComponent', () => {
  let component: PaperInstructionsComponent;
  let fixture: ComponentFixture<PaperInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaperInstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
