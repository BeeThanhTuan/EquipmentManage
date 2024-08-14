import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { numericValidator } from 'src/app/custom-validator/numericValidator';
import { PhoneNumberPipe } from 'src/app/custom-pipe/phone-number.pipe';
import { idEmployeeExistsValidator } from 'src/app/custom-validator/idEmployeeValidator';
import { EmployeeService } from 'src/app/services/employee.service';
import { showToastSuccess } from 'src/app/toast-message/toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  employeeAddForm: FormGroup;
  phoneNumberPipe = new PhoneNumberPipe();
  imageUrl: string | ArrayBuffer | null = '';
  @Output() employee : EventEmitter<Object> = new EventEmitter<Object>

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private toastrService: ToastrService) {
    this.employeeAddForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(6)], idEmployeeExistsValidator(employeeService)],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      gender: ['true'],
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

  removeImage(){
    this.imageUrl = '';
    this.employeeAddForm.get('image')?.setValue(null);
  }

  formatPhoneNumber(event: any) {
    let input = event.target.value.replace(/\s+/g, ''); // remove all space
    if (input.length > 10) {
      input = input.substring(0, 10); // maxlenght 10
    }
    this.employeeAddForm.get('phoneNumber')?.setValue(input, { emitEvent: false });
    event.target.value = this.phoneNumberPipe.transform(input);
  }

  formatID(event: any) {
    let input = event.target.value.replace(/\s+/g, '').toUpperCase(); 
    if (input.length > 6) {
      input = input.substring(0, 6); // maxlenght 10
    }
    this.employeeAddForm.get('id')?.setValue(input, { emitEvent: false });
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

  addNewEmployee() {
    const newEmployee = new FormData();
    const excludedFields = ['dateOfBirth', 'name', 'surname'];

    Object.keys(this.employeeAddForm.value).forEach(key => {
      if (!excludedFields.includes(key) ) {
        newEmployee.append(key, this.employeeAddForm.value[key]);
      }
    });

    const dateOfBirth = this.employeeAddForm.get('dateOfBirth')?.value;
    if (dateOfBirth) {
      const [year, month, day] = dateOfBirth.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      newEmployee.append('dateOfBirth', formattedDate);
    }

    this.employeeService.createNewEmployee(newEmployee).subscribe(
      (respone) =>{
        this.employee.emit(respone.data);
        this.removeEmployeeAddPopup();
        showToastSuccess(this.toastrService, 'Add new employee success!');  
      }
    )
  }

  removeEmployeeAddPopup() {
    const overlay = document.getElementById('overlayAdd') as HTMLElement;
    if (overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  }
}
