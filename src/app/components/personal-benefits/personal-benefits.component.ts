import { Component, Input, OnInit } from '@angular/core';
import WorkerBenefits from 'src/app/classes/worker-benefits';
import Worker from 'src/app/classes/worker';
import { WorkersBenefitsService } from 'src/app/services/workers-benefits.service';

@Component({
  selector: 'app-personal-benefits',
  templateUrl: './personal-benefits.component.html',
  styleUrls: ['./personal-benefits.component.css']
})
export class PersonalBenefitsComponent implements OnInit {

  workerBenefits: WorkerBenefits[] = [];
  counter = 0;
  constructor(private workersBenefitsService: WorkersBenefitsService) { }

  ngOnInit(): void {
    const workerString = localStorage.getItem('worker');
    if (workerString) {
      const workerObj: Worker = JSON.parse(workerString);
      this.workersBenefitsService.getSuppliersBenefitByWorkerId(workerObj.ID).subscribe(res => {
        res.forEach(element => {
          if (element.BenefitStatus == 0)
            this.workerBenefits[this.counter++] = element;
        });
      });
    }
  }
}
