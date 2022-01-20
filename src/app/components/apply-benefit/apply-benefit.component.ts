import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import WorkerBenefits from 'src/app/classes/worker-benefits';
import WorkersBenefits from 'src/app/classes/workers-benefits';
import { WorkerService } from 'src/app/services/worker.service';
import { WorkersBenefitsService } from 'src/app/services/workers-benefits.service';

@Component({
  selector: 'app-apply-benefit',
  templateUrl: './apply-benefit.component.html',
  styleUrls: ['./apply-benefit.component.css']
})
export class ApplyBenefitComponent implements OnInit {

  public workerBenefit: WorkersBenefits = new WorkersBenefits();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { obj: WorkerBenefits }, private workersBenefitsService: WorkersBenefitsService, private workerService: WorkerService) { }

  ngOnInit(): void {
    this.workerBenefit.ID = this.data.obj.ID;
    this.workerBenefit.WorkerID = this.data.obj.WorkerID;
    this.workerBenefit.SupplierBenefitID = this.data.obj.SupplierBenefitID;
    this.workerBenefit.BenefitStatus = 1;
    this.workerBenefit.Coupon = this.data.obj.Coupon;
    this.workersBenefitsService.updateWorkerBenefit(this.workerBenefit).subscribe(res => {
      this.workerService.sendCoupon(this.workerBenefit).subscribe(x => {
        console.log("email sent");
      });
    })
  }
}
