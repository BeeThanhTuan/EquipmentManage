import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhoneNumberPipe } from 'src/app/custom-pipe/phone-number.pipe';
import { EquipmentService } from 'src/app/services/equipment.service';
import { showToastSuccess } from 'src/app/toast-message/toastr';
import { Location } from '@angular/common';
import { idExistsValidator } from 'src/app/custom-validator/idEquipmentValidator';
@Component({
  selector: 'app-equipment-add',
  templateUrl: './equipment-add.component.html',
  styleUrls: ['./equipment-add.component.css']
})
export class EquipmentAddComponent {
  equipmentAddForm: FormGroup;
  phoneNumberPipe = new PhoneNumberPipe();
  imageUrl: string | ArrayBuffer | null = '';
  @Output() equipment: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private formBuilder: FormBuilder, private equipmentService: EquipmentService, private location: Location, private toastService: ToastrService) {
    this.equipmentAddForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(6)], idExistsValidator(equipmentService)],
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    });
  }

  get idControl() {
    return this.equipmentAddForm.get('id');
  }

  get nameControl() {
    return this.equipmentAddForm.get('name');
  }

  get descriptionControl() {
    return this.equipmentAddForm.get('description');
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.equipmentAddForm.patchValue({
        image: file,
      });
      // Read the file and update imageUrl
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(){
    this.imageUrl = '';
    this.equipmentAddForm.get('image')?.setValue(null);
  }

  getImage() {
    const fileControl = this.equipmentAddForm.get('image');
    if (fileControl) {
      return fileControl.value;
    }
    return null;
  }

  formatID(event: any) {
    let input = event.target.value.replace(/\s+/g, '').toUpperCase(); 
    if (input.length > 6) {
      input = input.substring(0, 6); // maxlenght 10
    }
    this.equipmentAddForm.get('id')?.setValue(input, { emitEvent: false });
  }

  addNewEquipment() {
    const newEquipment = new FormData();
    newEquipment.append('id', this.equipmentAddForm.get('id')?.value);
    newEquipment.append('name', this.equipmentAddForm.get('name')?.value);
    newEquipment.append('description', this.equipmentAddForm.get('description')?.value);
    newEquipment.append('image', this.equipmentAddForm.get('image')?.value);
    this.equipmentService.createNewEquipment(newEquipment).subscribe(
      (respone) =>{
        this.equipment.emit(respone.data);
        this.removeEquipmentAddPopup();
        showToastSuccess(this.toastService, 'Add new equipment success!');  
      }
    )
  }

  removeEquipmentAddPopup() {
    const overlay = document.getElementById('overlayAdd') as HTMLElement;
    if (overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  }
}
