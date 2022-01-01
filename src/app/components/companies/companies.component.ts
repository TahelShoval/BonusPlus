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
      image: 'assets/images/Golf-Co.png',
      thumbImage: 'assets/images/Golf-Co.png',
      alt: 'golf-co',
      title: 'golf-co'
    }, {
      image: 'assets/images/fox.png',
      thumbImage: 'assets/images/fox.png',
      alt: 'fox',
      title: 'fox'
    }, {
      image: 'assets/images/renuar.png',
      thumbImage: 'assets/images/renuar.png',
      alt: 'renuar',
      title: 'renuar'
    }, {
      image: 'assets/images/mango.png',
      thumbImage: 'assets/images/mango.png',
      alt: 'mango',
      title: 'mango'
    }, {
      image: 'assets/images/zara.png',
      thumbImage: 'assets/images/zara.png',
      alt: 'zara',
      title: 'zara'
    }, {
      image: 'assets/images/shilav.png',
      thumbImage: 'assets/images/shilav.png',
      alt: 'shilav',
      title: 'shilav'
    }, {
      image: 'assets/images/adidas.png',
      thumbImage: 'assets/images/adidas.png',
      alt: 'adidas',
      title: 'adidas'
    }, {
      image: 'assets/images/greg.png',
      thumbImage: 'assets/images/greg.png',
      alt: 'greg',
      title: 'greg'
    }, {
      image: 'assets/images/delta.png',
      thumbImage: 'assets/images/delta.png',
      alt: 'delta',
      title: 'delta'
    }, {
      image: 'assets/images/stimatki.png',
      thumbImage: 'assets/images/stimatki.png',
      alt: 'stimatki',
      title: 'stimatki'
    }
  ];
}
