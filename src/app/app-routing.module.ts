import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BenefitsUsedComponent } from './components/benefits-used/benefits-used.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PersonalBenefitsComponent } from './components/personal-benefits/personal-benefits.component';
import { PrivateAreaManagementComponent } from './components/private-area-management/private-area-management.component';
import { PrivateAreaWorkerComponent } from './components/private-area-worker/private-area-worker.component';
import { SignInManagementComponent } from './components/sign-in-management/sign-in-management.component';
import { SignInWorkerComponent } from './components/sign-in-worker/sign-in-worker.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WorkersComponent } from './components/workers/workers.component';

const routes: Routes = [
  { path: "", component: MainPageComponent },
  {
    path: "sign-in",
    component: SignInComponent,
    children: [
      { path: "Employee-entry", component: SignInWorkerComponent },
      { path: "Management-system", component: SignInManagementComponent, }
    ]
  },
  { path: "home", component: HomeComponent },
  { path: "companies", component: CompaniesComponent },
  { path: "workers", component: WorkersComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "contact", component: ContactComponent },
  { path: "sign-up", component: SignUpComponent },
  {
    path: "private-area-worker",
    component: PrivateAreaWorkerComponent,
    children: [
      { path: "personal-benefits", component: PersonalBenefitsComponent },
      { path: "benefits-used", component: BenefitsUsedComponent }
    ]
  },
  { path: "private-area-management", component: PrivateAreaManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
