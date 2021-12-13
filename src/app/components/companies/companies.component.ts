import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }


  imgCollection: Array<object> = [
    {
      thumbImage: 'assets/images/gali.png',
      alt: 'gali',
    }, {
      thumbImage: 'assets/images/fox.png',
      alt: 'fox'
    }, {
      thumbImage: 'assets/images/castro.png',
      alt: 'castro'
    }, {
      thumbImage: 'assets/images/tamnoon.jfif',
      alt: 'tamnoon'
    }, {
      thumbImage: 'assets/images/renuar.png',
      alt: 'renuar'
    }, {
      thumbImage: 'assets/images/mango.png',
      alt: 'mango'
    }, {
      thumbImage: 'assets/images/zara.png',
      alt: 'zara'
    }, {
      thumbImage: 'assets/images/topshop.jfif',
      alt: 'topshop'
    }, {
      thumbImage: 'assets/images/shilav.png',
      alt: 'shilav'
    }, {
      thumbImage: 'assets/images/adidas.png',
      alt: 'adidas'
    }, {
      thumbImage: 'assets/images/greg.png',
      alt: 'greg'
    }, {
      thumbImage: 'assets/images/delta.png',
      alt: 'delta'
    }
  ];
}
