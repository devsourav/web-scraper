import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerSetsComponent } from './picker-sets.component';

describe('PickerSetsComponent', () => {
  let component: PickerSetsComponent;
  let fixture: ComponentFixture<PickerSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickerSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
