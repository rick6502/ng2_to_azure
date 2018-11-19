import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmasListingComponent } from './xmas-listing.component';

describe('XmasListingComponent', () => {
  let component: XmasListingComponent;
  let fixture: ComponentFixture<XmasListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmasListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmasListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
