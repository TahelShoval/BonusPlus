import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import WorkerBenefits from 'src/app/classes/worker-benefits';

@Component({
  selector: 'app-show-cupon',
  templateUrl: './show-cupon.component.html',
  styleUrls: ['./show-cupon.component.css']
})
export class ShowCuponComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { obj: WorkerBenefits }) { }

  ngOnInit(): void {
  }

}
