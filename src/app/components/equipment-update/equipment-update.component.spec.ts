import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentUpdateComponent } from './equipment-update.component';

describe('EquipmentUpdateComponent', () => {
  let component: EquipmentUpdateComponent;
  let fixture: ComponentFixture<EquipmentUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentUpdateComponent]
    });
    fixture = TestBed.createComponent(EquipmentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
