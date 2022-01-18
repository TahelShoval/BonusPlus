import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-apply-benefit',
  templateUrl: './apply-benefit.component.html',
  styleUrls: ['./apply-benefit.component.css']
})
export class ApplyBenefitComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {cupon: string}) { }

  ngOnInit(): void {
  }

}
