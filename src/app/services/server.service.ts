import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor( private http : HttpClient) { }

  getNews(){
    return  this.http.get('https://api.spaceflightnewsapi.net/v4/articles/?limit=50&offset=1.json')
  }
}
