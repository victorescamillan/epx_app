import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchMembersPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'searchMembers',
})
export class SearchMembersPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  // transform(value: string, ...args) {
  //   return value.toLowerCase();
  // }
  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.map(member => member.filter( it => {
      return it.name.toLowerCase().includes(terms); // only filter country name
    }));
  }
}
