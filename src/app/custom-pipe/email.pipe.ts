import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailPipe'
})
export class EmailPipe implements PipeTransform {
  transform(value: string): string {
    if(value){
     const newEmail = value.split("@");
     return `@${newEmail[0]}`
    }
    return '';
  }

}
