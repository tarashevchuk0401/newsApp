import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { ActivatedRoute, Route } from '@angular/router';
import { filter, find, map } from 'rxjs';
import { NewsArticle } from '../shared/News';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  currentId: string = this.route.snapshot.params['id'];
  currentNews: Array<NewsArticle> = [];

  constructor(private serverService: ServerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getNewsById()
  }

  getNewsById() {
    this.serverService.getNews().pipe(
      map((item: any) => item.results),
    ).subscribe((d: any) => {
      this.currentNews.push(d.find((item: any) => item.id == this.currentId));
    })
  }

}
