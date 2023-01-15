import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  transform(value: any, word: string, newWord: string): unknown {
    const newValue = value.replace(word, newWord);
    return newValue;
  }
}
