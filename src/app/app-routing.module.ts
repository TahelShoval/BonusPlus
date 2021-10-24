import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { SignInManagementComponent } from './components/sign-in-management/sign-in-management.component';
import { SignInWorkerComponent } from './components/sign-in-worker/sign-in-worker.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { WorkersComponent } from './components/workers/workers.component';

const routes: Routes = [
  {
    path: "SignIn",
    component: SignInComponent,
    children: [
      { path: "EmployeeEntry", component: SignInWorkerComponent },
      { path: "ManagementSystem", component: SignInManagementComponent, }
    ]
  },
  { path: "home", component: HomeComponent},
  { path: "companies", component: CompaniesComponent},
  { path: "workers", component: WorkersComponent},
  { path: "about-us", component: AboutUsComponent},
  { path: "contact", component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
