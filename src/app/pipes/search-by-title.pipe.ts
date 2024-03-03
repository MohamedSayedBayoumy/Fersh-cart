import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/products';

@Pipe({
  name: 'searchByTitle',
})
export class SearchByTitlePipe implements PipeTransform {
  transform(arr: Product[], term: string): Product[] {
    return arr.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
