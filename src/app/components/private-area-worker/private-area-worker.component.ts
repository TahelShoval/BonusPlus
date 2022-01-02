import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-area-worker',
  templateUrl: './private-area-worker.component.html',
  styleUrls: ['./private-area-worker.component.css']
})
export class PrivateAreaWorkerComponent implements OnInit {

  title: string = "כל ההטבות";

  constructor() { }

  ngOnInit(): void {
  }

  changeTitle(n: number) {
    if (n == 1)
      this.title = "כל ההטבות";
    if (n == 2) {
      this.title = "הטבות שמימשתי";
    }
  }

}
