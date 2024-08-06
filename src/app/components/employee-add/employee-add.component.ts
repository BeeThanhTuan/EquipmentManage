import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { numericValidator } from 'src/app/custom-validator/numericValidator';
import { PhoneNumberPipe } from 'src/app/custom-pipe/phone-number.pipe';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  employeeAddForm: FormGroup;
  phoneNumberPipe = new PhoneNumberPipe();
  imageUrl: string | ArrayBuffer | null = '';

  constructor(private formBuilder: FormBuilder) {
    this.employeeAddForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      gender: ['0'],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          numericValidator(),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      dateOfBirth: [''],
      image: [null],
      fullName: [null]
    });
  }
  get idControl() {
    return this.employeeAddForm.get('id');
  }

  get nameControl() {
    return this.employeeAddForm.get('name');
  }

  get surnameControl() {
    return this.employeeAddForm.get('surname');
  }

  get emailControl() {
    return this.employeeAddForm.get('email');
  }

  get phoneNumberControl() {
    return this.employeeAddForm.get('phoneNumber');
  }

  get addressControl() {
    return this.employeeAddForm.get('address');
  }

  updateFullname() {
    const name = this.employeeAddForm.get('name')?.value;
    const surname = this.employeeAddForm.get('surname')?.value;
    const fullname = `${surname} ${name}`;
    this.employeeAddForm.get('fullName')?.setValue(fullname, { emitEvent: false });
  }

  formatPhoneNumber(event: any) {
    let input = event.target.value.replace(/\s+/g, ''); // remove all space
    if (input.length > 10) {
      input = input.substring(0, 10); // maxlenght 10
    }
    this.employeeAddForm.get('phoneNumber')?.setValue(input, { emitEvent: false });
    event.target.value = this.phoneNumberPipe.transform(input);
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.employeeAddForm.patchValue({
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
    const fileControl = this.employeeAddForm.get('image');
    if (fileControl) {
      return fileControl.value;
    }
    return null;
  }

  updateEmployee() {
    console.table(this.employeeAddForm.value);
  }

  removeEmployeeAddPopup() {
    const overlay = document.getElementById('overlayAdd') as HTMLElement;
    if (overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  }
}
