import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Address from 'src/app/classes/address';
import Employer from 'src/app/classes/employer';
import { AddressService } from 'src/app/services/address.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EmployerService } from 'src/app/services/employer.service';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.css']
})
export class MyDetailsComponent implements OnInit {

  isFormInvalid = false;

  updateForm = new FormGroup({});
  employer: Employer = new Employer();
  address: Address = new Address();
  updateEmployer: Employer = new Employer();
  updateAddress: Address = new Address();

  constructor(private addressService: AddressService, private employerService: EmployerService) { }

  ngOnInit(): void {
    const employerID = localStorage.getItem('employerID');
    if (employerID)
      this.employerService.getEmployerById(Number(employerID)).subscribe(res => {
        this.employer = res;
        this.addressService.getAddressById(this.employer.AddressID).subscribe(res => { this.address = res; });
      })
    this.updateForm = new FormGroup({
      'company': new FormControl("", [Validators.required, Validators.maxLength(20)]),
      'name': new FormControl("", [Validators.required, Validators.maxLength(20),]),
      'address': new FormGroup({
        'street': new FormControl("", [Validators.required, Validators.maxLength(20)]),
        'city': new FormControl("", [Validators.required, Validators.maxLength(20)]),
        'zipCode': new FormControl("", [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern("^[0-9]*$")]),
      }),
      'phone': new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'emailConfirm': new FormControl(null, [Validators.required, Validators.email,]),
      'userName': new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[0-9])[a-z0-9].{8,}')]),
      'password': new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern('(?=.*[a-z])(?=.*[0-9])[a-z0-9].{8,}')]),
      'passwordConfirm': new FormControl("", [Validators.required])
    });
  }

  onSubmit(updateForm: FormGroup) {
    debugger;
    if (!updateForm.valid) {
      this.isFormInvalid = true;
      return;
    }
    debugger;
    this.updateAddress.ID = this.address.ID;
    this.updateAddress.City = updateForm.value.address.city;
    this.updateAddress.Street = updateForm.value.address.street;
    this.updateAddress.ZipCode = updateForm.value.address.zipCode;
    this.addressService.updateAddress(this.updateAddress).subscribe(() => {
      this.updateEmployer.AddressID = this.updateAddress.ID;
      this.updateEmployer.EmployerID = this.employer.EmployerID;
      this.updateEmployer.CompanyName = this.updateForm.value.CompanyName;
      this.updateEmployer.NameEmployer = this.updateForm.value.NameEmployer;
      this.updateEmployer.Email = this.updateForm.value.Email;
      this.updateEmployer.Phone = this.updateForm.value.Phone;
      this.updateEmployer.EmployerUserName = this.updateForm.value.EmployerUserName;
      this.updateEmployer.EmployerPassword = this.updateForm.value.EmployerPassword;
      this.employerService.updateEmployer(this.updateEmployer).subscribe(res => {
        console.log("update")
      })
    });
  }

  onCancel() {
    debugger;
    window.location.reload();
  }

  //errors
  getEmailError() {
    return this.updateForm.get('email')?.hasError('required') ? 'שדה חובה' :
      this.updateForm.get('email')?.hasError('email') ? 'כתובת מייל לא תקינה' : '';
  }

  getEmailConfirmError() {
    return this.updateForm.get('emailConfirm')?.hasError('required') ? 'שדה חובה' :
      this.updateForm.get('emailConfirm')?.hasError('emailConfirm') ? 'כתובת מייל לא תקינה' : '';
  }

  getCompanyError() {
    return this.updateForm.get('company')?.hasError('required') ? 'שדה חובה' :
      this.updateForm.get('company')?.hasError('maxlength') ? 'לא תקין' : '';
  }

  getNameError() {
    return this.updateForm.get('name')?.hasError('required') ? 'שדה חובה' :
      this.updateForm.get('name')?.hasError('maxlength') ? 'לא תקין' : '';
  }

  getStreetError() {
    return this.updateForm.get('address')?.get('street')?.hasError('required') ? 'שדה חובה' :
      this.updateForm.get('address')?.get('street')?.hasError('maxlength') ? 'לא תקין' : '';
  }

  getCityError() {
    return this.updateForm.get('address')?.get('city')?.hasError('required') ? 'שדה חובה' :
      this.updateForm.get('address')?.get('city')?.hasError('maxlength') ? 'לא תקין' : '';

  }

  getZipCodeError() {
    return this.updateForm.get('address')?.get('zipCode')?.hasError('required') ? 'שדה חובה' :
      this.updateForm.get('address')?.get('zipCode')?.hasError('minlength') ? 'מספר המיקוד שגוי' :
        this.updateForm.get('address')?.get('zipCode')?.hasError('maxlength') ? 'מספר המיקוד שגוי' :
          this.updateForm.get('address')?.get('zipCode')?.hasError('pattern') ? 'מספר המיקוד שגוי' : '';

  }

  getPhoneError() {
    return this.updateForm.get('phone')?.hasError('required') ? 'שדה חובה' :
      this.updateForm.get('phone')?.hasError('minlength') ? 'מספר פלאפון שגוי' :
        this.updateForm.get('phone')?.hasError('maxlength') ? 'מספר פלאפון שגוי' :
          this.updateForm.get('phone')?.hasError('pattern') ? 'מספר פלאפון שגוי' : '';
  }

  getUserNameError() {
    return this.updateForm.get('userName')?.hasError('required') ? 'שדה חובה' :
      this.updateForm.get('userName')?.hasError('minlength') ? 'צריך להכיל לפחות 8 תווים' :
        this.updateForm.get('userName')?.hasError('maxlength') ? 'לא תקין' :
          this.updateForm.get('userName')?.hasError('pattern') ? 'צריך להכיל אותיות באנגלית ומספרים' : '';
  }

  getPasswordError() {
    return this.updateForm.get('password')?.hasError('required') ? 'שדה חובה' :
      this.updateForm.get('password')?.hasError('minlength') ? 'סיסמא חייבת להכיל 8-12 תווים' :
        this.updateForm.get('password')?.hasError('maxlength') ? 'סיסמא חייבת להכיל 8-12 תווים' :
          this.updateForm.get('password')?.hasError('pattern') ? 'צריך להכיל אותיות באנגלית ומספרים' : '';
  }

  getPasswordConfirmError() {
    return this.updateForm.get('passwordConfirm')?.hasError('required') ? 'שדה חובה' :
      this.updateForm.get('passwordConfirm')?.hasError('minlength') ? 'סיסמא חייבת להכיל 8-12 תווים' :
        this.updateForm.get('passwordConfirm')?.hasError('maxlength') ? 'סיסמא חייבת להכיל 8-12 תווים' : '';
  }

}