import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namePipe'
})
export class NamePipe implements PipeTransform {

  transform(value: string): string {
    if(value){
      const newName= value.split(" ");
      if(newName.length>1){
        return newName[newName.length - 1];
      }
      return value
    }
    return '';
  }

}
