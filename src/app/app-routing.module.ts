import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsPageComponent } from './news-page/news-page.component';

const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'home', component : HomeComponent},
  {path: 'news-page/:id', component : NewsPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
