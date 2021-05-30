import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideImgComponent } from './side-img.component';

describe('SideImgComponent', () => {
  let component: SideImgComponent;
  let fixture: ComponentFixture<SideImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
