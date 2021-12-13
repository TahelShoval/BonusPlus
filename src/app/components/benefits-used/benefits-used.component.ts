import { Component, OnInit } from '@angular/core';
import WorkerBenefits from 'src/app/classes/worker-benefits';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SuppliersBenefitsService } from 'src/app/services/suppliers-benefits.service';

@Component({
  selector: 'app-benefits-used',
  templateUrl: './benefits-used.component.html',
  styleUrls: ['./benefits-used.component.css']
})
export class BenefitsUsedComponent implements OnInit {

  workerBenefits: WorkerBenefits[] = [];

  constructor(private suppliersBenefitsService: SuppliersBenefitsService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.suppliersBenefitsService.getSuppliersBenefitByWorkerId(this.authenticationService.worker.ID).subscribe(res => {
      this.workerBenefits = res;
    });
  }

}
