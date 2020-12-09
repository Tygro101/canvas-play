import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasBackgroundComponent } from './components/canvas-background/canvas-background.component';
import { FpsComponent } from './components/fps/fps.component';
import { ViewComponentComponent } from './view-component/view-component.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasBackgroundComponent,
    FpsComponent,
    ViewComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
