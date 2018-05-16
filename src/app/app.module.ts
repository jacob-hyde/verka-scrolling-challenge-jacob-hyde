import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { ThumbnailService } from './thumbnail.service';
import { InfinityScrollingComponent } from './infinity-scrolling/infinity-scrolling.component';

@NgModule({
  declarations: [
    AppComponent,
    InfinityScrollingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [ThumbnailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
