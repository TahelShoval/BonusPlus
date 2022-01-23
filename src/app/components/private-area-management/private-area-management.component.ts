import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Category from 'src/app/classes/category';
import WorkerBenefits from 'src/app/classes/worker-benefits';

import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-private-area-management',
  templateUrl: './private-area-management.component.html',
  styleUrls: ['./private-area-management.component.css']
})
export class PrivateAreaManagementComponent implements OnInit {

  title: string = "כל ההטבות"
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService, private route: Router) { }

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
  }

  changeTitle(n: number) {
    if (n == 1)
      this.title = "כל ההטבות";
    if (n == 2)
      this.title = "פרטי עובדים";
    if (n == 3)
      this.title = "הפרטים שלי";
  }

  selectCategory(id: number) {
    this.route.navigate(['private-area-management/all-benefits/' + id]).then(() =>
      window.location.reload());
  }

}
