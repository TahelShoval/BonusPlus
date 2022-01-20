import { Component, OnInit } from '@angular/core';
import WorkerBenefits from 'src/app/classes/worker-benefits';
import Worker from 'src/app/classes/worker';
import { WorkersBenefitsService } from 'src/app/services/workers-benefits.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowCuponComponent } from '../show-cupon/show-cupon.component';

@Component({
  selector: 'app-benefits-used',
  templateUrl: './benefits-used.component.html',
  styleUrls: ['./benefits-used.component.css']
})
export class BenefitsUsedComponent implements OnInit {

  workerBenefits: WorkerBenefits[] = [];
  counter = 0;
  constructor(private workersBenefitsService: WorkersBenefitsService, public dialog: MatDialog) { }

  public openDialog(obj: WorkerBenefits): void {
    const dialogRef = this.dialog.open(ShowCuponComponent, {
      width: '500px',
      data: { obj: obj }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    const workerString = localStorage.getItem('worker');
    if (workerString) {
      const workerObj: Worker = JSON.parse(workerString);
      this.workersBenefitsService.getSuppliersBenefitByWorkerId(workerObj.ID).subscribe(res => {
        res.forEach(element => {
          if (element.BenefitStatus == 1)
            this.workerBenefits[this.counter++] = element;
        });
      });
    }
  }
}
