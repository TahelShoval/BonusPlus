import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
    
  }

  get company() { return this.signUpForm.get('company'); }

}
