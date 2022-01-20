import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PersonalBenefitsComponent } from '../personal-benefits/personal-benefits.component';



@Component({
  selector: 'app-realize-dialog',
  templateUrl: './realize-dialog.component.html',
  styleUrls: ['./realize-dialog.component.css']
  
})
export class RealizeDialogComponent  {
    constructor  (public dialog:MatDialog){}
    openDialog(){
     this.dialog.open(PersonalBenefitsComponent);
    }
   }

