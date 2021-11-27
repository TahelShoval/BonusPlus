import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInWorkerComponent } from './components/sign-in-worker/sign-in-worker.component';
import { SignInManagementComponent } from './components/sign-in-management/sign-in-management.component';
import { FormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { WorkersComponent } from './components/workers/workers.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivateAreaWorkerComponent } from './components/private-area-worker/private-area-worker.component';
import { PrivateAreaManagementComponent } from './components/private-area-management/private-area-management.component';
import { PersonalBenefitsComponent } from './components/personal-benefits/personal-benefits.component';
import { BenefitsUsedComponent } from './components/benefits-used/benefits-used.component';
import { MainPageComponent } from './components/main-page/main-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignInComponent,
    SignInWorkerComponent,
    SignInManagementComponent,
    ForgetPasswordComponent,
    SignUpComponent,
    CompaniesComponent,
    WorkersComponent,
    AboutUsComponent,
    ContactComponent,
    PrivateAreaWorkerComponent,
    PrivateAreaManagementComponent,
    PersonalBenefitsComponent,
    BenefitsUsedComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
