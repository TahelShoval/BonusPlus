import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Employer from 'src/app/classes/employer';
import SuppliersBenefits from 'src/app/classes/suppliers-benefits';
import Worker from 'src/app/classes/worker';
import WorkersBenefits from 'src/app/classes/workers-benefits';
import { EmployerService } from 'src/app/services/employer.service';
import { SuppliersBenefitsService } from 'src/app/services/suppliers-benefits.service';
import { WorkerService } from 'src/app/services/worker.service';
import { WorkersBenefitsService } from 'src/app/services/workers-benefits.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  benefit: SuppliersBenefits = new SuppliersBenefits();
  workerBenefit: WorkersBenefits[] = [];
  w: WorkersBenefits = new WorkersBenefits();
  id: number = 0;
  counter = 0;

  paymentForm = new FormGroup({});

  workers: Worker[] = [];
  displayedColumns: string[] = ['Seniority', 'JobType', 'WorkerID', 'WorkerName', 'select'];
  dataSource: any;
  employer: Employer = new Employer();
  selection = new SelectionModel<Worker>(true, []);

  constructor(
    private workerService: WorkerService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private route: Router,
    private suppliersBenefitsService: SuppliersBenefitsService,
    private workersBenefitsService: WorkersBenefitsService,
    private employerService: EmployerService) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(data => {
      this.id = parseInt(data[1].path);
    });
    this.suppliersBenefitsService.GetAllDetailsSuppliersBenefits().subscribe(res => {
      const benefits = res.filter(x => x.ID == this.id);
      this.benefit = benefits[0]
    })
    const employerID = localStorage.getItem('employerID');
    if (employerID)
      this.employerService.getEmployerById(Number(employerID)).subscribe(res => {
        this.employer = res;
        this.workerService.getWorkersByEmployerId(this.employer.EmployerID).subscribe(res => {
          this.workers = res;
          this.dataSource = [...this.workers];
        })
      })

    this.paymentForm = new FormGroup({
      'nameCardHolder': new FormControl(
        "",
        [Validators.required,
        Validators.maxLength(20),
        ]),

      'idCardHolder': new FormControl(
        "",
        [Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern("^[0-9]*$")
        ]),

      'cardNumber': new FormControl(
        "",
        [Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern("^[0-9]*$")
        ]),

      'expireMonth': new FormControl(
        "",
        [Validators.required,
        Validators.min(1),
        Validators.max(12),
        Validators.pattern("^[0-9]*$")
        ]),

      'expireYear': new FormControl(
        "",
        [Validators.required,
        Validators.min(2022),
        Validators.max(2032),
        Validators.pattern("^[0-9]*$")
        ]),

      'cvv': new FormControl(
        "",
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern("^[0-9]*$")
        ]),

    });
  }

  onSubmit(paymentForm: FormGroup) {
    if (paymentForm.valid) {
      this.selection.selected.forEach(obj => {
        this.w = new WorkersBenefits();
        debugger;
        this.w.WorkerID = obj.ID;
        this.w.SupplierBenefitID = this.benefit.ID;
        this.workerBenefit.push(this.w);
      })
      debugger;
      this.workersBenefitsService.addWorkersBenefits(this.workerBenefit).subscribe(() => {
        this.openSnackBar();
        this.route.navigate(['/private-area-management/all-benefits/0']);
      });
    }
  }

  openSnackBar() {
    this.snackBar.open('הרכישה בוצעה בהצלחה! אישור רכישה נשלח למייל', 'סגור', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 10000,
    });

  }

  getNameCardHolderError() {
    return this.paymentForm.get('nameCardHolder')?.hasError('required') ? 'שדה חובה' :
      this.paymentForm.get('nameCardHolder')?.hasError('maxlength') ? 'מוגבל ל 20 תווים' : '';
  }

  getIdCardHolderError() {
    return this.paymentForm.get('idCardHolder')?.hasError('required') ? 'שדה חובה' :
      this.paymentForm.get('idCardHolder')?.hasError('minlength') ? 'לא תקין' :
        this.paymentForm.get('idCardHolder')?.hasError('maxlength') ? 'לא תקין' :
          this.paymentForm.get('idCardHolder')?.hasError('pattern') ? 'תעודת הזהות אינה תקינה ' : '';
  }

  getCardNumberError() {
    return this.paymentForm.get('cardNumber')?.hasError('required') ? 'שדה חובה' :
      this.paymentForm.get('cardNumber')?.hasError('minlength') ? 'לא תקין' :
        this.paymentForm.get('cardNumber')?.hasError('maxlength') ? 'לא תקין' :
          this.paymentForm.get('cardNumber')?.hasError('pattern') ? 'מספר הכרטיס הינו מכיל מספרים בלבד' : '';
  }

  getExpireMonthError() {
    return this.paymentForm.get('expireMonth')?.hasError('required') ? 'שדה חובה' :
      this.paymentForm.get('expireMonth')?.hasError('min') ? 'לא תקין' :
        this.paymentForm.get('expireMonth')?.hasError('max') ? 'לא תקין' :
          this.paymentForm.get('expireMonth')?.hasError('pattern') ? 'בין 1 ל-12' : '';
  }

  getExpireYearError() {
    return this.paymentForm.get('expireYear')?.hasError('required') ? 'שדה חובה' :
      this.paymentForm.get('expireYear')?.hasError('min') ? 'התוקף אינו תקין ' :
        this.paymentForm.get('expireYear')?.hasError('max') ? ' התוקף אינו תקין' :
          this.paymentForm.get('expireYear')?.hasError('pattern') ? ' אינו תקין' : '';
  }

  getCvvError() {
    return this.paymentForm.get('cvv')?.hasError('required') ? 'שדה חובה' :
      this.paymentForm.get('cvv')?.hasError('minlength') ? 'לא תקין' :
        this.paymentForm.get('cvv')?.hasError('maxlength') ? 'לא תקין' :
          this.paymentForm.get('cvv')?.hasError('pattern') ? 'מכיל 3 ספרות בלבד' : '';
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach((row: any) => this.selection.select(row));
  }
}