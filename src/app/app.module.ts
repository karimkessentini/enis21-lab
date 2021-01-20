import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {MemberListComponent} from './main/member/member-list/member-list.component';
import {MemberFormComponent} from './main/member/member-form/member-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from "../@root/shared.module";
import {LayoutComponent} from './layout/layout.component';
import { ToolComponent } from './main/tool/tool.component';
import { ArticleComponent } from './main/article/article.component';
import { EventComponent } from './main/event/event.component';
import { LoginComponent } from './main/login/login.component';
import { MemberProfileComponent } from './main/member/member-profile/member-profile.component';
import { ToolFormComponent } from './main/tool/tool-form/tool-form.component';
import { ArticleFormComponent } from './main/article/article-form/article-form.component';
import { EventFormComponent } from './main/event/event-form/event-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    MemberListComponent,
    MemberFormComponent,
    ToolComponent,
    ArticleComponent,
    EventComponent,
    LoginComponent,
    MemberProfileComponent,
    ToolFormComponent,
    ArticleFormComponent,
    EventFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
