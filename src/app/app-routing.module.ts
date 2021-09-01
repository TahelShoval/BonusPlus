import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInManagementComponent } from './components/sign-in-management/sign-in-management.component';
import { SignInWorkerComponent } from './components/sign-in-worker/sign-in-worker.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: "SignIn",
    component: SignInComponent,
    children: [
      { path: "EmployeeEntry", component: SignInWorkerComponent },
      { path: "ManagementSystem", component: SignInManagementComponent, }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
