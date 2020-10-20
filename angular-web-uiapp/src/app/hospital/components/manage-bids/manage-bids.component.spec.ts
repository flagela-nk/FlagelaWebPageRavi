import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBidsComponent } from './manage-bids.component';

describe('ManageBidsComponent', () => {
  let component: ManageBidsComponent;
  let fixture: ComponentFixture<ManageBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
