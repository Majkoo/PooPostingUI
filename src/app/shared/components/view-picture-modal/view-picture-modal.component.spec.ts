import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPictureModalComponent } from './view-picture-modal.component';

describe('ViewPictureModalComponent', () => {
  let component: ViewPictureModalComponent;
  let fixture: ComponentFixture<ViewPictureModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPictureModalComponent]
    });
    fixture = TestBed.createComponent(ViewPictureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
