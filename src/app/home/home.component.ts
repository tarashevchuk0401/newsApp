import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NewsArticle } from '../shared/News';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allNews: Array<NewsArticle> = [];
  renderedNews: Array<NewsArticle> = [];

  constructor(private serverService: ServerService) {
  }

  ngOnInit(): void {
    this.getAllNews();
    this.searchByKeyWord()
  }

  // Getting data from API and put in allNews array.
  getAllNews() {
    this.serverService.getNews().subscribe((data: any) => {
      this.allNews = data;
      this.renderedNews = data;
    })
  }

  //Creating observable with debounceTime to call function  1 sec after user finished typing
  searchByKeyWord() {
    const inputElement = document.getElementById('myInput') as HTMLInputElement;
    const input$ = fromEvent(inputElement, 'input');

    input$.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(() => {
      //Filtering by title 
      this.renderedNews = this.allNews.filter((item: NewsArticle) => item.title.toLowerCase()
        .includes(inputElement.value.trim().toLowerCase()));

      //Pushing to the end of array articles which contains search keyword in description
      this.allNews.map(item => {
        if (this.renderedNews.includes(item)) return;
        if (item.summary.toLowerCase().includes(inputElement.value.trim().toLowerCase())) {
          this.renderedNews.push(item);
        }
      })
    })
  }

}
