import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
// import { SignupComponent } from './signup/signup.component';
// import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
// import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
// import { FooterComponent } from './shared/footer/footer.component';

// import { HomeModule } from './home/home.module';
// import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './profile/calendar/calendar.component';
import { GroupByPipePipe } from './_services/group-by-pipe.pipe';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    // SignupComponent,
    // LandingComponent,
    ProfileComponent,
    NavbarComponent,
    // FooterComponent,
    // LoginComponent,
    CalendarComponent,
    GroupByPipePipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    // HomeModule,
    HttpClientModule,
    NgbModule,
    FullCalendarModule ,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
