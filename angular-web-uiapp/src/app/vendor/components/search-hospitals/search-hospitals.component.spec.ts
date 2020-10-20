import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHospitalsComponent } from './search-hospitals.component';

describe('SearchHospitalsComponent', () => {
  let component: SearchHospitalsComponent;
  let fixture: ComponentFixture<SearchHospitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHospitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
