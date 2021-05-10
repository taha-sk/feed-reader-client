import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWidgetsComponent } from './manage-widgets.component';

describe('ManageWidgetsComponent', () => {
  let component: ManageWidgetsComponent;
  let fixture: ComponentFixture<ManageWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
