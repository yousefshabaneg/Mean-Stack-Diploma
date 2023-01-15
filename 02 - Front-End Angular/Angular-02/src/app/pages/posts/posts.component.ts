import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any = [];

  constructor(public global: GlobalService) {}

  ngOnInit(): void {
    this.global.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }
}
