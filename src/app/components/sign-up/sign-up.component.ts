import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Employer from 'src/app/classes/employer';
import { EmployerService } from 'src/app/services/employer.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    company: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    phone: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl("", Validators.required),
    userName: new FormControl("", Validators.required),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(10)])
  });

  constructor(private employerService:EmployerService) { }

  ngOnInit(): void {

  }

  onSubmit(signUpForm: FormGroup) {
    const employer = new Employer();
    employer.CompanyName = signUpForm.value.company;
    employer.NameEmployer = signUpForm.value.name;
    employer.Email = signUpForm.value.email;
    employer.AddressID = signUpForm.value.address;
    employer.Phone = signUpForm.value.phone;
    employer.EmployerUserName = signUpForm.value.userName;
    employer.EmployerPassword = signUpForm.value.password;
    
    this.employerService.createNewEmployer(employer);
  }

  get company() { return this.signUpForm.get('company'); }

}
