import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhoneNumberPipe } from 'src/app/custom-pipe/phone-number.pipe';
import { EquipmentService } from 'src/app/services/equipment.service';
import { showToastSuccess } from 'src/app/toast-message/toastr';

@Component({
  selector: 'app-equipment-update',
  templateUrl: './equipment-update.component.html',
  styleUrls: ['./equipment-update.component.css'],
})
export class EquipmentUpdateComponent {
  equimentUpdateForm: FormGroup;
  phoneNumberPipe = new PhoneNumberPipe();
  imageUrl: string | ArrayBuffer | null = '';
  @Input() equipment!: any;
  @Output() newEquipment: EventEmitter<Object> = new EventEmitter<Object>();
  constructor(private formBuilder: FormBuilder, private equipmentService: EquipmentService, private toastService: ToastrService) {
    this.equimentUpdateForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      idEmployee: [''],
      query: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equipment']) {
      this.setData();
    }
  }

  ngOnInit(): void {
    this.equimentUpdateForm.get('query')?.valueChanges.subscribe(() => {
      this.searchIDEmployee();
    });
  }

  setData() {
    this.equimentUpdateForm.get('id')?.setValue(this.equipment.ID);
    this.equimentUpdateForm.get('name')?.setValue(this.equipment.Name);
    this.equimentUpdateForm.get('description')?.setValue(this.equipment.Description);
    this.imageUrl = this.equipment.Image ? `http://localhost:3000/resources/${this.equipment.Image}` : '';
    const idEquipment = this.equipment.IDEmployee? this.equipment.IDEmployee: '-None-';
    this.equimentUpdateForm.get('idEmployee')?.setValue(idEquipment);
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

  getIDEmployee(event: Event) {
    const elm = event.target as HTMLElement;
    const id = elm.firstChild?.textContent;
    this.equimentUpdateForm.get('idEmployee')?.setValue(id);
    this.removeSearchIDEmployee();
  }

  updateEquipment() {
    const newEquipment = new FormData();
    const id = this.equimentUpdateForm.get('id')?.value
    newEquipment.append('name', this.equimentUpdateForm.get('name')?.value);
    newEquipment.append('description', this.equimentUpdateForm.get('description')?.value);
    newEquipment.append('image', this.equimentUpdateForm.get('image')?.value);
    const idEmployee = this.equimentUpdateForm.get('idEmployee')?.value !== '-None-' ? this.equimentUpdateForm.get('idEmployee')?.value : '';
    newEquipment.append('idEmployee', idEmployee);
    this.equipmentService.updateEquipmentByID(id, newEquipment).subscribe(
      (respone) =>{
        this.newEquipment.emit(respone.data);
        this.removeEmquimentUpdatePopup();
        showToastSuccess(this.toastService, 'Update equipment success!');  
      }
    )
  }

  removeImage() {
    this.imageUrl = '';
    this.equimentUpdateForm.get('image')?.setValue(null);
  }

  removeEmquimentUpdatePopup() {
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    if (overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  }

  openSearchIDEmployee() {
    const selectBox = document.getElementById(
      'searchBoxEmployee'
    ) as HTMLElement;
    selectBox.classList.add('active');
  }

  removeSearchIDEmployee() {
    const selectBox = document.getElementById(
      'searchBoxEmployee'
    ) as HTMLElement;
    if (selectBox.classList.contains('active')) {
      selectBox.classList.remove('active');
    }
  }

  removeSearchIDEmployeeOverLay(event: Event) {
    const selectBox = document.getElementById('searchBoxEmployee') as HTMLElement;
    const target = event.target as Node;
    if (!selectBox.contains(target)) {
      if (selectBox.classList.contains('active')) {
        selectBox.classList.remove('active');
      }
    }
  }

  searchIDEmployee() {
    const query = this.equimentUpdateForm.get('query')?.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const items: NodeListOf<HTMLLIElement> = document.querySelectorAll('ul.list-employee li');
    items.forEach((item) => {
      const text = item
        .textContent!.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      if (text.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
