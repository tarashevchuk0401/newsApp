import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { ActivatedRoute, Route } from '@angular/router';
import { takeUntil } from 'rxjs';
import { NewsArticle } from '../shared/News';
import { UnsubscribingService } from '../services/unsubscribing.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})

export class NewsPageComponent extends UnsubscribingService implements OnInit {

  currentId: string = this.route.snapshot.params['id'];
  currentNews: NewsArticle[] = [];

  constructor(private serverService: ServerService, private route: ActivatedRoute) {
    super()
  }

  ngOnInit(): void {
    this.getNewsById();
  }

  getNewsById() {
    this.serverService.getNews().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((data: any) => {
      this.currentNews.push(data.find((item: NewsArticle) => item.id === Number(this.currentId)));
    })
  }

}
