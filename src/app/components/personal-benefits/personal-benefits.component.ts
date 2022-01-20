import { Component, Input, OnInit } from '@angular/core';
import WorkerBenefits from 'src/app/classes/worker-benefits';
import Worker from 'src/app/classes/worker';
import { WorkersBenefitsService } from 'src/app/services/workers-benefits.service';
import { MatDialog } from '@angular/material/dialog';
import { ApplyBenefitComponent } from '../apply-benefit/apply-benefit.component';

@Component({
  selector: 'app-personal-benefits',
  templateUrl: './personal-benefits.component.html',
  styleUrls: ['./personal-benefits.component.css']
})
export class PersonalBenefitsComponent implements OnInit {

  workerBenefits: WorkerBenefits[] = [];
  counter = 0;
  constructor(private workersBenefitsService: WorkersBenefitsService, public dialog: MatDialog) { }

  public openDialog(obj: WorkerBenefits): void {
    const dialogRef = this.dialog.open(ApplyBenefitComponent, {
      width: '500px',
      data: { obj: obj }
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
      console.log('The dialog was closed');
    });
  }

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
