import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultCsvComponent } from './consult-csv.component';

describe('ConsultCsvComponent', () => {
  let component: ConsultCsvComponent;
  let fixture: ComponentFixture<ConsultCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
