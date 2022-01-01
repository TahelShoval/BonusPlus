import { Component, OnInit } from '@angular/core';
import WorkerBenefits from 'src/app/classes/worker-benefits';
import Worker from 'src/app/classes/worker';
import { WorkersBenefitsService } from 'src/app/services/workers-benefits.service';

@Component({
  selector: 'app-benefits-used',
  templateUrl: './benefits-used.component.html',
  styleUrls: ['./benefits-used.component.css']
})
export class BenefitsUsedComponent implements OnInit {

  workerBenefits: WorkerBenefits[] = [];

  constructor(private workersBenefitsService: WorkersBenefitsService) { }

  ngOnInit(): void {
    const workerString = localStorage.getItem('worker');
    if (workerString) {
      const workerObj: Worker = JSON.parse(workerString);
      this.workersBenefitsService.getSuppliersBenefitByWorkerId(workerObj.ID).subscribe(res => {
        this.workerBenefits = res;
      });
    }
  }
}
