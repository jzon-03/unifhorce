import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { A11yModule } from '@angular/cdk/a11y';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { EventsComponent } from './components/events/events.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommunityComponent } from './components/community/community.component';
import { FacebookPostComponent } from './components/facebook-post/facebook-post.component';
import { NewsAlertsComponent } from './components/news-alerts/news-alerts.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    TestimonialsComponent,
    ResourcesComponent,
    EventsComponent,
    ContactComponent,
    FooterComponent,
    CommunityComponent,
    FacebookPostComponent,
    NewsAlertsComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    A11yModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
