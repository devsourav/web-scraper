import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteUrlComponent } from './site-url.component';

describe('SiteUrlComponent', () => {
  let component: SiteUrlComponent;
  let fixture: ComponentFixture<SiteUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
