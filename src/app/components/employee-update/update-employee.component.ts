import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { numericValidator } from 'src/app/custom-validator/numericValidator';
import { PhoneNumberPipe } from 'src/app/custom-pipe/phone-number.pipe';
import { showToastError, showToastSuccess } from 'src/app/toast-message/toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent {
  employeeUpdateForm: FormGroup;
  phoneNumberPipe = new PhoneNumberPipe();
  imageUrl: string | ArrayBuffer | null = '';
  @Input() employee!:any;
  @Output() newEmployee: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private toastrService: ToastrService) {
    this.employeeUpdateForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
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
      image: [''],
      fullName: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.setData();
    }
  }


  setData() {
    this.employeeUpdateForm.get('id')?.setValue(this.employee.ID);
    const [firstName, middleName, name] = this.employee.Name.split(' ');
    this.employeeUpdateForm.get('gender')?.setValue(this.employee.Gender ? '0' : '1');
    this.employeeUpdateForm.get('name')?.setValue(name);
    this.employeeUpdateForm.get('surname')?.setValue(`${firstName} ${middleName}`);
    this.employeeUpdateForm.get('email')?.setValue(this.employee.Email);
    this.employeeUpdateForm.get('address')?.setValue(this.employee.Address);
    const dateOfBirth = this.employee.DateOfBirth;
    if (dateOfBirth) {
      const [day, month, year] = dateOfBirth.split('/');
      const formattedDate = `${year}-${month}-${day}`;
      this.employeeUpdateForm.get('dateOfBirth')?.setValue(formattedDate);
    }
    this.employeeUpdateForm.get('phoneNumber')?.setValue(this.employee.PhoneNumber);
    this.imageUrl = this.employee.Image ? `http://localhost:3000/resources/employees/${this.employee.Image}` : '';
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

  removeImage(){
    this.imageUrl = '';
    this.employeeUpdateForm.get('image')?.setValue(null);
  }

  updateEmployee() {
    this.updateFullname();
    const newEmployee = new FormData();
    //fields that need to be removed
    const id = this.employeeUpdateForm.get('id')?.value;
    const dateOfBirth = this.employeeUpdateForm.get('dateOfBirth')?.value;
    const excludedFields = ['dateOfBirth', 'id', 'name', 'surname'];

    Object.keys(this.employeeUpdateForm.value).forEach(key => {
      if (!excludedFields.includes(key) ) {
        newEmployee.append(key, this.employeeUpdateForm.value[key]);
      }
    });

    if (dateOfBirth) {
      const [year, month, day] = dateOfBirth.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      newEmployee.append('dateOfBirth', formattedDate);
    }
    
    this.employeeService.updateEmployeeByID(id, newEmployee).subscribe(
      (respone) =>{
        this.newEmployee.emit(respone.data);
        this.removeEmployeeUpdatePopup();
        showToastSuccess(this.toastrService, 'Update eqmployee success!');  
      },
      (error)=>{
        showToastError(this.toastrService, `${error}`);  
      }
    )
  }

  removeEmployeeUpdatePopup() {
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    if (overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  }
}
