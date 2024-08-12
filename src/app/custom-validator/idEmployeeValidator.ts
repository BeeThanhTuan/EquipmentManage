import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmployeeService } from '../services/employee.service';

export function idEmployeeExistsValidator(employeeService: EmployeeService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
    // Nếu control không có giá trị, trả về null (không có lỗi)
    if (!control.value) {
      return of(null);
    }
    // Kiểm tra ID qua dịch vụ
    return employeeService.checkEmployeeIdExists(control.value).pipe(
      map(exists => (exists ? { 'idExists': { value: control.value } }: null)), // Trả về lỗi nếu ID tồn tại
      catchError(() => of(null)) // Nếu có lỗi, không trả về lỗi gì
    );
  };
}