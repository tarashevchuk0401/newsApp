import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NewsArticle } from '../shared/News';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allNews: Array<NewsArticle> = [];

  constructor(private serverService: ServerService) {

  }

  ngOnInit(): void {
    this.getAllNews()
  }

  // Getting data from API and put in allNews array.
  getAllNews() {
    this.serverService.getNews().subscribe((data: any) => {
      this.allNews = data;
      console.log(this.allNews)
    })
  }

}
