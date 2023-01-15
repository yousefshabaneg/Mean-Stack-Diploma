import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTemp',
})
export class ConvertTempPipe implements PipeTransform {
  transform(value: any, unit: string) {
    if (unit === 'C') {
      return (value - 32) / 1.8;
    } else if (unit === 'F') {
      return value * 1.8 + 32;
    }
    return;
  }
}
