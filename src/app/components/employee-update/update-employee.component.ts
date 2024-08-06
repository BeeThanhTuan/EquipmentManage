import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { numericValidator } from 'src/app/custom-validator/numericValidator';
import { PhoneNumberPipe } from 'src/app/custom-pipe/phone-number.pipe';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent {
  employeeUpdateForm: FormGroup;
  phoneNumberPipe = new PhoneNumberPipe();
  imageUrl: string | ArrayBuffer | null = '';

  constructor(private formBuilder: FormBuilder) {
    this.employeeUpdateForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
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


  get nameControl() {
    return this.employeeUpdateForm.get('name');
  }

  get surnameControl() {
    return this.employeeUpdateForm.get('surname');
  }

  get emailControl() {
    return this.employeeUpdateForm.get('email');
  }

  get phoneNumberControl() {
    return this.employeeUpdateForm.get('phoneNumber');
  }

  get addressControl() {
    return this.employeeUpdateForm.get('address');
  }

  updateFullname() {
    const name = this.employeeUpdateForm.get('name')?.value;
    const surname = this.employeeUpdateForm.get('surname')?.value;
    const fullname = `${surname} ${name}`;
    this.employeeUpdateForm.get('fullName')?.setValue(fullname, { emitEvent: false });
  }

  formatPhoneNumber(event: any) {
    let input = event.target.value.replace(/\s+/g, ''); // remove all space
    if (input.length > 10) {
      input = input.substring(0, 10); // maxlenght 10
    }
    this.employeeUpdateForm.get('phoneNumber')?.setValue(input, { emitEvent: false });
    event.target.value = this.phoneNumberPipe.transform(input);
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.employeeUpdateForm.patchValue({
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
    const fileControl = this.employeeUpdateForm.get('image');
    if (fileControl) {
      return fileControl.value;
    }
    return null;
  }

  updateEmployee() {
    console.table(this.employeeUpdateForm.value);
  }

  removeEmployeeUpdatePopup() {
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    if (overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  }
}
