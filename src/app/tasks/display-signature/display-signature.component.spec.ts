import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySignatureComponent } from './display-signature.component';

describe('DisplaySignatureComponent', () => {
  let component: DisplaySignatureComponent;
  let fixture: ComponentFixture<DisplaySignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySignatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
