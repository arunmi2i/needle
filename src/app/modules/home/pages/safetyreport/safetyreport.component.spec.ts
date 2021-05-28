import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyreportComponent } from './safetyreport.component';

describe('SafetyreportComponent', () => {
  let component: SafetyreportComponent;
  let fixture: ComponentFixture<SafetyreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
