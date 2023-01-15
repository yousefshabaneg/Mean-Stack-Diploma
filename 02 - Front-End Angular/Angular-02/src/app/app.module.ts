import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CardComponent } from './components/card/card.component';
import { IndexComponent } from './pages/index/index.component';
import { UsersComponent } from './pages/users/users.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { Comp1Component } from './components/comp1/comp1.component';
import { ConvertTempPipe } from './pipes/convert-temp.pipe';
import { ReplacePipe } from './pipes/replace.pipe';
import { ContactComponent } from './pages/contact/contact.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { PostsComponent } from './pages/posts/posts.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogsComponent,
    CardComponent,
    IndexComponent,
    UsersComponent,
    GalleryComponent,
    Comp1Component,
    ConvertTempPipe,
    ReplacePipe,
    ContactComponent,
    AddUserComponent,
    EditUserComponent,
    PostsComponent,
    SinglePostComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
