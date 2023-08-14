import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

 transform(value: string, keywords: string): string {
    
    if (!keywords || !value) {
      return value;
    }

    let keywordsArray = Array.from(keywords.trim().split(' '))

    //Highlighting only whole words
    const pattern = new RegExp(`\\b${keywordsArray.join('|')}\\b`, 'gmi');
    return value.replace(pattern, match => `<span class="highlight">${match}</span>`);
  
  }

}
