import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hbFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }
    return items.filter(i => {
      if (!isNaN(i[field])) {
        i[field] += '';
      }
      if (field === 'category') {
        i[field] = i.catName;
      }
      return i[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
}
