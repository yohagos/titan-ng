import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter'
})
export class TextFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string) {
    if (!items) return []
    if (!searchText) return items

    return items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(searchText.toLowerCase())
      })
    })
  }
}
