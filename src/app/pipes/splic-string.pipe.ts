import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splicString',
})
export class SplicStringPipe implements PipeTransform {
  transform(str: string, num: number): string {
    return str.split(' ').splice(0, num).join(' ');
  }
}
