import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SuppliersBenefits from 'src/app/classes/suppliers-benefits';
import { SuppliersBenefitsService } from 'src/app/services/suppliers-benefits.service';

@Component({
  selector: 'app-all-benefits',
  templateUrl: './all-benefits.component.html',
  styleUrls: ['./all-benefits.component.css']
})
export class AllBenefitsComponent implements OnInit {

  id: number = 0;
  suppliersBenefits: SuppliersBenefits[] = [];

  constructor(private suppliersBenefitsService: SuppliersBenefitsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(data => {
      this.id = parseInt(data[1].path);
    });
    if (this.id == 0)
      this.suppliersBenefitsService.GetAllDetailsSuppliersBenefits().subscribe(res => { this.suppliersBenefits = res; })
    else
      this.suppliersBenefitsService.GetBenefitsByCategotyID(this.id).subscribe(res => { this.suppliersBenefits = res; console.log(this.suppliersBenefits) })
  }

  purchase(id: number) {
    this.router.navigate(['/payment/' + id]);
  }
}
