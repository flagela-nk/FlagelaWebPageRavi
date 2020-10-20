import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsheetsComponent } from './factsheets.component';

describe('FactsheetsComponent', () => {
  let component: FactsheetsComponent;
  let fixture: ComponentFixture<FactsheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactsheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactsheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
