import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get('https://api.spaceflightnewsapi.net/v4/articles/?limit=50&offset=1.json')
      .pipe(map((item: any) => item.results));
  }


}
