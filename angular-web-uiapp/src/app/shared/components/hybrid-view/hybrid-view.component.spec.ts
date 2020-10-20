import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HybridViewComponent } from './hybrid-view.component';

describe('HybridViewComponent', () => {
  let component: HybridViewComponent;
  let fixture: ComponentFixture<HybridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HybridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HybridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
