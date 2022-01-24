import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  action: string;
  actionName: string;
  actionNameButton: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.action == "Update") {
      this.actionName = "עדכון פרטי עובד";
      this.actionNameButton = "עדכון"
    }
    else if (this.local_data.action == "Delete") {
      this.actionName = "מחיקת עובד";
      this.actionNameButton = "מחיקה"
    }
    else {
      this.actionName = "הוספת עובד";
      this.actionNameButton = "הוספה"
    }
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }


}