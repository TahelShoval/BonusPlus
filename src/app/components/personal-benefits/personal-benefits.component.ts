import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import WorkerBenefits from 'src/app/classes/worker-benefits';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SuppliersBenefitsService } from 'src/app/services/suppliers-benefits.service';

@Component({
  selector: 'app-personal-benefits',
  templateUrl: './personal-benefits.component.html',
  styleUrls: ['./personal-benefits.component.css']
})
export class PersonalBenefitsComponent implements OnInit {
  

  workerBenefits: WorkerBenefits[] = [];

  constructor(
    private suppliersBenefitsService: SuppliersBenefitsService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.suppliersBenefitsService.getSuppliersBenefitByWorkerId(this.authenticationService.worker.ID).subscribe(res => {
      this.workerBenefits = res;
    });

  }

}
