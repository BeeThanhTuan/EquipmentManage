import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDetailComponent } from './equipment-detail.component';

describe('EquipmentDetailComponent', () => {
  let component: EquipmentDetailComponent;
  let fixture: ComponentFixture<EquipmentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentDetailComponent]
    });
    fixture = TestBed.createComponent(EquipmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
