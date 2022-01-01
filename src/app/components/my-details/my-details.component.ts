import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Address from 'src/app/classes/address';
import Employer from 'src/app/classes/employer';
import { AddressService } from 'src/app/services/address.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.css']
})
export class MyDetailsComponent implements OnInit {

  updateForm = new FormGroup({});
  employer: Employer = new Employer();
  address: Address = new Address();
  updateEmployer: Employer = new Employer();
  updateAddress: Address = new Address();

  constructor(private addressService: AddressService) { }

  ngOnInit(): void {
    const employer = localStorage.getItem('employer');
    if (employer)
      this.employer = JSON.parse(employer);
    this.addressService.getAddressById(this.employer.AddressID).subscribe(res => { this.address = res; });
    this.updateForm = new FormGroup({
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
      'userName': new FormControl("", Validators.required),
      'password': new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
    });
  }

  onSubmit(updateForm: FormGroup) {
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
    });
  }

  onCancel() {
    this.ngOnInit();
  }

}
