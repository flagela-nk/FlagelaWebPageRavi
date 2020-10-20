import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHubComponent } from './customer-hub.component';

describe('CustomerHubComponent', () => {
  let component: CustomerHubComponent;
  let fixture: ComponentFixture<CustomerHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
