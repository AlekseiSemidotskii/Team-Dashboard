import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { PlannedIssuesComponent } from './issues/planned/planned-issues.component';
import { PlannedIssuesService } from './issues/planned/planned-issues.service'


@NgModule({
  declarations: [
    AppComponent,
    PlannedIssuesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ HttpClientModule, PlannedIssuesService ],
  bootstrap: [AppComponent]
})

export class AppModule { }
