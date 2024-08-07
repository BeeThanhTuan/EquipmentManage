import { ToastrService } from 'ngx-toastr';

export function showToastSuccess(toastr: ToastrService, message: string) {
  toastr.success(
    `<span class="custom-icon success" ><i class="fa-solid fa-check icon"></i></span> ${message}
     <i class="fa-solid fa-xmark close"></i>`,
    'Success',
    {
      enableHtml: true,
      toastClass: 'ngx-toastr custom-toast custom-toast-success',
    }
  );
}

export function showToastError(toastr: ToastrService, message: string) {
  toastr.error(
    `<span class="custom-icon error"><i class="fa-solid fa-xmark icon"></i></span> ${message}
    <i class="fa-solid fa-xmark close"></i>`,
    'Error',
    {
      timeOut: 4000,
      enableHtml: true,
      toastClass: 'ngx-toastr custom-toast custom-toast-error',
    }
  );
}

export function showToastInfo(toastr: ToastrService, message: string) {
  toastr.info(
    `<span class="custom-icon info"><i class="fa-solid fa-info icon"></i></span> ${message}
        <i class="fa-solid fa-xmark close"></i>`,
    'Info',
    {
      timeOut: 2000,
      enableHtml: true,
      toastClass: 'ngx-toastr custom-toast custom-toast-info',
    }
  );
}

export function showToastWarning(toastr: ToastrService, message: string) {
  toastr.warning(
    `<span class="custom-icon warning"><i class="fa-solid fa-exclamation icon"></i></span> ${message}
        <i class="fa-solid fa-xmark close"></i>`,
    'Warning',
    {
      timeOut: 2000,
      enableHtml: true,
      toastClass: 'ngx-toastr custom-toast custom-toast-warning',
    }
  );
}



// ToastrModule.forRoot({
//     positionClass: 'toast-top-right',
//     timeOut: 2000,
//     progressBar: true,
//     progressAnimation: 'decreasing', 
//     closeButton: true,
//     enableHtml: true,
//     titleClass: 'toast-title',
//     messageClass: 'toast-message',
//   }),