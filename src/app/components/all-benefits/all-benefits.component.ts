import { Component, OnInit } from '@angular/core';
import SuppliersBenefits from 'src/app/classes/suppliers-benefits';
import { SuppliersBenefitsService } from 'src/app/services/suppliers-benefits.service';

@Component({
  selector: 'app-all-benefits',
  templateUrl: './all-benefits.component.html',
  styleUrls: ['./all-benefits.component.css']
})
export class AllBenefitsComponent implements OnInit {

  suppliersBenefits: SuppliersBenefits[] = [];

  constructor(private suppliersBenefitsService: SuppliersBenefitsService) { }

  ngOnInit(): void {
    this.suppliersBenefitsService.GetAllDetailsSuppliersBenefits().subscribe(res => { this.suppliersBenefits = res })
  }
}
