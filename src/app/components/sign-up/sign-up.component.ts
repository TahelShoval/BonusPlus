import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, PatternValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { EmployerService } from 'src/app/services/employer.service';
import Employer from 'src/app/classes/employer';
import Address from 'src/app/classes/address';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInData } from 'src/app/classes/signInData';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MyErrorStateMatcher } from 'src/app/classes/MyErrorStateMatcher';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isLinear = false;
  isEditable = false;

  isFormInvalid = false;

  signUpForm = new FormGroup({});
  address = new Address();
  a = new Address();
  matcher = new MyErrorStateMatcher();

  constructor(
    private addressService: AddressService,
    private employerService: EmployerService,
    private snackBar: MatSnackBar,
    private route: Router,
    private authenticationService: AuthenticationService) { }


  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      'company': new FormControl("", [Validators.required, Validators.maxLength(20)]),
      'name': new FormControl("", [Validators.required, Validators.maxLength(20),]),
      'address': new FormGroup({
        'street': new FormControl("", [Validators.required, Validators.maxLength(20)]),
        'city': new FormControl("", [Validators.required, Validators.maxLength(20)]),
        'zipCode': new FormControl("", [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern("^[0-9]*$")]),
      }),
      'phone': new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'userName': new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[0-9])[a-z0-9].{7,}')]),
      'password': new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern('(?=.*[a-z])(?=.*[0-9])[a-z0-9].{7,}')]),
      'passwordConfirm': new FormControl("")
    }, { validators: this.passwordMatchingValidatior });

  }

  openSnackBar(userName: string, password: string) {
    this.snackBar.open('הרישום עבר בהצלחה! ברוכים הבאים', 'סגור', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 10000,
    });
    var signInData: SignInData = new SignInData(userName, password, 'employer');
    this.authenticationService.authenticate(signInData);

  }

  onSubmit(signUpForm: FormGroup) {
    if (!signUpForm.valid) {
      this.isFormInvalid = true;
      return;
    }
    this.address.City = signUpForm.value.address.city;
    this.address.Street = signUpForm.value.address.street;
    this.address.ZipCode = signUpForm.value.address.zipCode;

    this.addressService.createNewAddress(this.address).subscribe(x => {

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
        this.employerService.createNewEmployer(employer).subscribe(() => {
          this.openSnackBar(signUpForm.value.userName, signUpForm.value.password);
        })
      });
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
    return this.signUpForm.get('company')?.hasError('required') ? 'שדה חובה' :
      this.signUpForm.get('company')?.hasError('maxlength') ? 'לא תקין' : '';
  }

  getNameError() {
    return this.signUpForm.get('name')?.hasError('required') ? 'שדה חובה' :
      this.signUpForm.get('name')?.hasError('maxlength') ? 'לא תקין' : '';
  }

  getStreetError() {
    return this.signUpForm.get('address')?.get('street')?.hasError('required') ? 'שדה חובה' :
      this.signUpForm.get('address')?.get('street')?.hasError('maxlength') ? 'לא תקין' : '';
  }

  getCityError() {
    return this.signUpForm.get('address')?.get('city')?.hasError('required') ? 'שדה חובה' :
      this.signUpForm.get('address')?.get('city')?.hasError('maxlength') ? 'לא תקין' : '';

  }

  getZipCodeError() {
    return this.signUpForm.get('address')?.get('zipCode')?.hasError('required') ? 'שדה חובה' :
      this.signUpForm.get('address')?.get('zipCode')?.hasError('minlength') ? 'מספר המיקוד שגוי' :
        this.signUpForm.get('address')?.get('zipCode')?.hasError('maxlength') ? 'מספר המיקוד שגוי' :
          this.signUpForm.get('address')?.get('zipCode')?.hasError('pattern') ? 'מספר המיקוד שגוי' : '';

  }

  getPhoneError() {
    return this.signUpForm.get('phone')?.hasError('required') ? 'שדה חובה' :
      this.signUpForm.get('phone')?.hasError('minlength') ? 'מספר פלאפון שגוי' :
        this.signUpForm.get('phone')?.hasError('maxlength') ? 'מספר פלאפון שגוי' :
          this.signUpForm.get('phone')?.hasError('pattern') ? 'מספר פלאפון שגוי' : '';
  }

  getUserNameError() {
    return this.signUpForm.get('userName')?.hasError('required') ? 'שדה חובה' :
      this.signUpForm.get('userName')?.hasError('minlength') ? 'צריך להכיל לפחות 8 תווים' :
        this.signUpForm.get('userName')?.hasError('maxlength') ? 'לא תקין' :
          this.signUpForm.get('userName')?.hasError('pattern') ? 'צריך להכיל אותיות באנגלית ומספרים' : '';
  }

  getPasswordError() {
    return this.signUpForm.get('password')?.hasError('required') ? 'שדה חובה' :
      this.signUpForm.get('password')?.hasError('minlength') ? 'סיסמא חייבת להכיל 8-12 תווים' :
        this.signUpForm.get('password')?.hasError('maxlength') ? 'סיסמא חייבת להכיל 8-12 תווים' :
          this.signUpForm.get('password')?.hasError('pattern') ? 'צריך להכיל אותיות באנגלית ומספרים' : '';
  }

  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('passwordConfirm');
    debugger
    return password?.value === confirmPassword?.value ? null : { notSame: true };
  };


}