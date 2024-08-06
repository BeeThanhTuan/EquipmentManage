import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentAddComponent } from './equipment-add.component';

describe('EquipmentAddComponent', () => {
  let component: EquipmentAddComponent;
  let fixture: ComponentFixture<EquipmentAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentAddComponent]
    });
    fixture = TestBed.createComponent(EquipmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
