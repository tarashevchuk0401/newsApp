import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NewsArticle } from '../shared/News';
import { debounceTime, distinctUntilChanged, fromEvent, takeUntil } from 'rxjs';
import { UnsubscribingService } from '../services/unsubscribing.service';
import { splitNsName } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends UnsubscribingService implements OnInit {

  allNews: NewsArticle[] = [];
  renderedNews: NewsArticle[] = [];

  constructor(private serverService: ServerService) {
    super()
  }

  ngOnInit(): void {
    this.getAllNews();
    this.searchByKeyWord();
  }

  // Getting data from API and put in allNews array.
  getAllNews() {
    this.serverService.getNews().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((data: any) => {
      this.allNews = data;
      this.renderedNews = data;
    })
  }

  //Creating observable with debounceTime to call function  1 sec after user finished typing
  searchByKeyWord() {
    let myInputElement = document.getElementById('myInput') as HTMLInputElement;
    let input$ = fromEvent(myInputElement, 'input');
    let searchTerm: any[] = [];


    input$.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(() => {
      let matchedNews: NewsArticle[] = [];
      searchTerm.push(myInputElement.value.trim().toLowerCase().split(' '));
      let keyWord = searchTerm[searchTerm.length - 1];

      //Firstly filtering by title 
      keyWord.forEach((item: string) => {
        for (let i = 0; i < this.allNews.length; i++) {
          if (this.allNews[i].title.toLowerCase().includes(item)) {
            matchedNews.push(this.allNews[i])
          }
        }
      })

      //Pushing to the end of array articles which contains search keyword in description (summary)
      keyWord.forEach((item: string) => {
        for (let i = 0; i < this.allNews.length; i++) {
          if (this.allNews[i].summary.toLowerCase().includes(item)) {
            matchedNews.push(this.allNews[i])
          }
        }
      })

      // Only unique object is used
      const seenIds: any = {};
      this.renderedNews = matchedNews.filter(obj => {
        if (!seenIds[obj.id]) {
          seenIds[obj.id] = true;
          return true;
        }
        return false;
      });


    })
  }

}
