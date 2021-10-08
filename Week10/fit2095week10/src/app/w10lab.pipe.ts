import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'w10lab'
})
export class W10labPipe implements PipeTransform {

  transform(value: number): number {
    return new Date().getFullYear() - value;
  }

}
