import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneNumberPipe } from 'src/app/custom-pipe/phone-number.pipe';

@Component({
  selector: 'app-equipment-update',
  templateUrl: './equipment-update.component.html',
  styleUrls: ['./equipment-update.component.css']
})
export class EquipmentUpdateComponent {
  equimentUpdateForm: FormGroup;
  phoneNumberPipe = new PhoneNumberPipe();
  imageUrl: string | ArrayBuffer | null = '';

  constructor(private formBuilder: FormBuilder) {
    this.equimentUpdateForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null],
      status: ['0', ]
    });
  }


  get nameControl() {
    return this.equimentUpdateForm.get('name');
  }

  get statusControl() {
    return this.equimentUpdateForm.get('status');
  }

  get descriptionControl() {
    return this.equimentUpdateForm.get('description');
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.equimentUpdateForm.patchValue({
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

  getImage() {
    const fileControl = this.equimentUpdateForm.get('image');
    if (fileControl) {
      return fileControl.value;
    }
    return null;
  }

  updateEquipment() {
    console.table(this.equimentUpdateForm.value);
  }

  removeEmquimentUpdatePopup() {
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    if (overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  }
}
