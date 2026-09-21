import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAnimal } from './select-animal';

describe('SelectAnimal', () => {
  let component: SelectAnimal;
  let fixture: ComponentFixture<SelectAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAnimal],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAnimal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
