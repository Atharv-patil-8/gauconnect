import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanFarmer } from './scan-farmer';

describe('ScanFarmer', () => {
  let component: ScanFarmer;
  let fixture: ComponentFixture<ScanFarmer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanFarmer],
    }).compileComponents();

    fixture = TestBed.createComponent(ScanFarmer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
