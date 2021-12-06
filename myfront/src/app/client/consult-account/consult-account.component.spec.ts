import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultAccountComponent } from './consult-account.component';

describe('ConsultAccountComponent', () => {
  let component: ConsultAccountComponent;
  let fixture: ComponentFixture<ConsultAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
