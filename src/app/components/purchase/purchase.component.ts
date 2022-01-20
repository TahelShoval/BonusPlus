import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Employer from 'src/app/classes/employer';
import SuppliersBenefits from 'src/app/classes/suppliers-benefits';
import Worker from 'src/app/classes/worker';
import WorkersBenefits from 'src/app/classes/workers-benefits';
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
  workerBenefit: WorkersBenefits = new WorkersBenefits();
  id: number = 0;

  paymentForm = new FormGroup({});

  workers: Worker[] = [];
  displayedColumns: string[] = ['Seniority', 'JobType', 'WorkerID', 'WorkerName', 'select'];
  dataSource: any;
  employer: Employer = new Employer();
  selection = new SelectionModel<Worker>(true, []);

  constructor(private workerService: WorkerService, private activatedRoute: ActivatedRoute, private suppliersBenefitsService: SuppliersBenefitsService, private workersBenefitsService: WorkersBenefitsService) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(data => {
      this.id = parseInt(data[1].path);
    });
    this.suppliersBenefitsService.GetAllDetailsSuppliersBenefits().subscribe(res => {
      const benefits = res.filter(x => x.ID == this.id);
      this.benefit = benefits[0]
    })
    const employer = localStorage.getItem('employer');
    if (employer)
      this.employer = JSON.parse(employer);
    this.workerService.getWorkersByEmployerId(this.employer.EmployerID).subscribe(res => {
      this.workers = res;
      this.dataSource = [...this.workers];
    })
    this.paymentForm = new FormGroup({
      'nameCardHolder': new FormControl("", Validators.required),
      'idCardHolder': new FormControl("", Validators.required),
      'cardNumber': new FormControl("", Validators.required),
      'expireMonth': new FormControl("", Validators.required),
      'expireYear': new FormControl("", Validators.required),
      'cvv': new FormControl("", Validators.required),

    });
  }

  onSubmit(paymentForm: FormGroup) {
    if (!paymentForm.valid) {
      console.log(this.selection.selected);
      this.selection.selected.forEach(obj => {
        this.workerBenefit.WorkerID = obj.ID;
        this.workerBenefit.SupplierBenefitID = this.benefit.ID;
        this.workerBenefit.BenefitStatus = 0;
        this.workerBenefit.Coupon = 123;
        this.workersBenefitsService.addWorkerBenefit(this.workerBenefit).subscribe(x => {
          console.log('add');
        })
      })
    }
  }

  getNameCardHolderError() {
    return this.paymentForm.get('nameCardHolder')?.hasError('required') ? 'שדה חובה' : '';
  }

  getIdCardHolderError() {
    return this.paymentForm.get('idCardHolder')?.hasError('required') ? 'שדה חובה' : '';
  }

  getCardNumberError() {
    return this.paymentForm.get('cardNumber')?.hasError('required') ? 'שדה חובה' : '';
  }

  getExpireMonthError() {
    return this.paymentForm.get('expireMonth')?.hasError('required') ? 'שדה חובה' : '';
  }

  getExpireYearError() {
    return this.paymentForm.get('expireYear')?.hasError('required') ? 'שדה חובה' : '';
  }

  getCvvError() {
    return this.paymentForm.get('cvv')?.hasError('required') ? 'שדה חובה' : '';
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
