import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageCompare'
})
export class AgeComparePipe implements PipeTransform {

  transform(year: number, ...args: number[]): string {
    let res: string = ""
    if (year < 1980) {
      res = 'old'
    }
    else if (year >= 1980 && year < 2000) {
      res = 'Middle Aged'
    }
    else {
      res = 'young '
    }
    return res
  }

}
