import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDeckComponent } from './widget-deck.component';

describe('WidgetDeckComponent', () => {
  let component: WidgetDeckComponent;
  let fixture: ComponentFixture<WidgetDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
