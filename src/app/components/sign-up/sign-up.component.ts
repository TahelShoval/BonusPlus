import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { EmployerService } from 'src/app/services/employer.service';
import Employer from 'src/app/classes/employer';
import Address from 'src/app/classes/address';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isLinear = false;
  isEditable = false;

  signUpForm = new FormGroup({});
  address = new Address();
  a = new Address();

  constructor(private addressService: AddressService, private employerService: EmployerService, private _formBuilder: FormBuilder) { }

  isFormInvalid = false;

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      'company': new FormControl("", Validators.required),
      'name': new FormControl("", Validators.required),
      'address': new FormGroup({
        'street': new FormControl("", Validators.required),
        'city': new FormControl("", Validators.required),
        'zipCode': new FormControl("", Validators.required),
      }),
      'phone': new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
        ]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'emailConfirm': new FormControl(null, [Validators.required, Validators.email]),
      'userName': new FormControl("", Validators.required),
      'password': new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      'passwordConfirm': new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(12)])
    });

  }

  onSubmit(signUpForm: FormGroup) {
    if (!signUpForm.valid) {
      this.isFormInvalid = true;
      return;
    }

    this.address.City = signUpForm.value.address.city;
    this.address.Street = signUpForm.value.address.street;
    this.address.ZipCode = signUpForm.value.address.zipCode;

    this.addressService.createNewAddress(this.address).subscribe(x =>{

    this.addressService.getAddressByZipCode(this.address.ZipCode).subscribe(res => {
      this.a = res;

      const employer = new Employer();
      employer.CompanyName = signUpForm.value.company;
      employer.NameEmployer = signUpForm.value.name;
      employer.Email = signUpForm.value.email;
      employer.AddressID = res.AddressID;
      employer.Phone = signUpForm.value.phone;
      employer.EmployerUserName = signUpForm.value.userName;
      employer.EmployerPassword = signUpForm.value.password;
      debugger;
      this.employerService.createNewEmployer(employer);

    })
      ;

    })
  }

  //errors
  getEmailError() {
    return this.signUpForm.get('email')?.hasError('required') ? 'שדה חובה' :
      this.signUpForm.get('email')?.hasError('email') ? 'כתובת מייל לא תקינה' : '';
  }

  getEmailConfirmError() {
    return this.signUpForm.get('emailConfirm')?.hasError('required') ? 'שדה חובה' :
      this.signUpForm.get('emailConfirm')?.hasError('emailConfirm') ? 'כתובת מייל לא תקינה' : '';
  }

  getCompanyError() {
    return this.signUpForm.get('company')?.hasError('required') ? 'שדה חובה' : '';
  }

  getNameError() {
    return this.signUpForm.get('name')?.hasError('required') ? 'שדה חובה' : '';
  }

  getStreetError() {
    return this.signUpForm.get('address')?.get('street')?.hasError('required') ? 'שדה חובה' : '';
  }

  getCityError() {
    return this.signUpForm.get('address')?.get('city')?.hasError('required') ? 'שדה חובה' : '';
  }

  getZipCodeError() {
    return this.signUpForm.get('address')?.get('zipCode')?.hasError('required') ? 'שדה חובה' : '';
  }

  getPhoneError() {
    return this.signUpForm.get('phone')?.hasError('required') ? 'שדה חובה' :
      this.signUpForm.get('phone')?.hasError('minlength') ? 'מספר פלאפון שגוי' :
        this.signUpForm.get('phone')?.hasError('maxlength') ? 'מספר פלאפון שגוי' :
          this.signUpForm.get('phone')?.hasError('pattern') ? 'מספר פלאפון שגוי' : '';
  }

  getUserNameError() {
    return this.signUpForm.get('userName')?.hasError('required') ? 'שדה חובה' : '';
  }

  getPasswordError() {
    return this.signUpForm.get('password')?.hasError('required') ? 'שדה חובה' : '';
  }

  getPasswordConfirmError() {
    return this.signUpForm.get('passwordConfirm')?.hasError('required') ? 'שדה חובה' : '';
  }

}