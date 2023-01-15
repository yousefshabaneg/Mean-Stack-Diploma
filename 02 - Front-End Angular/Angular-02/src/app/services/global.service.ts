import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  //https://jsonplaceholder.typicode.com/posts?limit=5
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts?_limit=6');
  }

  getSinglePost(postId: any): Observable<any> {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
}
