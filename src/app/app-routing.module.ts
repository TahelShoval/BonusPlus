import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AllBenefitsComponent } from './components/all-benefits/all-benefits.component';
import { BenefitsUsedComponent } from './components/benefits-used/benefits-used.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MyDetailsComponent } from './components/my-details/my-details.component';
import { PersonalBenefitsComponent } from './components/personal-benefits/personal-benefits.component';
import { PersonalWorkersComponent } from './components/personal-workers/personal-workers.component';
import { PrivateAreaManagementComponent } from './components/private-area-management/private-area-management.component';
import { PrivateAreaWorkerComponent } from './components/private-area-worker/private-area-worker.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SignInManagementComponent } from './components/sign-in-management/sign-in-management.component';
import { SignInWorkerComponent } from './components/sign-in-worker/sign-in-worker.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthEmployerGuard } from './guards/auth-employer.guard';
import { AuthWorkerGuard } from './guards/auth-worker.guard';

const routes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "worker-entry", component: SignInWorkerComponent },
  { path: "management-entry", component: SignInManagementComponent },
  { path: "home", component: HomeComponent },
  { path: "companies", component: CompaniesComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "contact", component: ContactComponent },
  { path: "sign-up", component: SignUpComponent },
  {
    path: "private-area-worker",
    component: PrivateAreaWorkerComponent,
    canActivate: [AuthWorkerGuard],
    children: [
      { path: "personal-benefits", component: PersonalBenefitsComponent },
      { path: "benefits-used", component: BenefitsUsedComponent }
    ]
  },
  { path: "purchase", component: PurchaseComponent },
  {
    path: "private-area-management",
    component: PrivateAreaManagementComponent,
    canActivate: [AuthEmployerGuard],
    children: [
      { path: "all-benefits/:id", component: AllBenefitsComponent },
      { path: "personal-workers", component: PersonalWorkersComponent },
      { path: "my-details", component: MyDetailsComponent }
    ]
  },
  { path: "payment/:id", component: PurchaseComponent, canActivate: [AuthEmployerGuard], }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
