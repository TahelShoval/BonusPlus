import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import Worker from 'src/app/classes/worker';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 list:Worker[]=[]
  constructor(private home:HomeService) { }

  ngOnInit(): void {
    this.home.getWorkers().subscribe(res=>this.list = res)

  }
  onSave(){
    this.home.getWorkers().subscribe(res=>this.list = res)
  }
}
