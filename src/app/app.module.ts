/* eslint-disable @typescript-eslint/no-unused-vars */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IconsModule} from './icons.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, IconsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
