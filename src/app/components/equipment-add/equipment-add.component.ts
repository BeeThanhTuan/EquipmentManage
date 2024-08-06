import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneNumberPipe } from 'src/app/custom-pipe/phone-number.pipe';

@Component({
  selector: 'app-equipment-add',
  templateUrl: './equipment-add.component.html',
  styleUrls: ['./equipment-add.component.css']
})
export class EquipmentAddComponent {
  equimentAddForm: FormGroup;
  phoneNumberPipe = new PhoneNumberPipe();
  imageUrl: string | ArrayBuffer | null = '';

  constructor(private formBuilder: FormBuilder) {
    this.equimentAddForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null],
      status: [0]
    });
  }
  get idControl() {
    return this.equimentAddForm.get('id');
  }

  get nameControl() {
    return this.equimentAddForm.get('name');
  }

  get descriptionControl() {
    return this.equimentAddForm.get('description');
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.equimentAddForm.patchValue({
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
    const fileControl = this.equimentAddForm.get('image');
    if (fileControl) {
      return fileControl.value;
    }
    return null;
  }

  addEquipment() {
    console.table(this.equimentAddForm.value);
  }

  removeEquipmentAddPopup() {
    const overlay = document.getElementById('overlayAdd') as HTMLElement;
    if (overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  }
}
