import { Component, OnInit } from '@angular/core';
import Worker from 'src/app/classes/worker';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WorkerService } from 'src/app/services/worker.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-personal-workers',
  templateUrl: './personal-workers.component.html',
  styleUrls: ['./personal-workers.component.css']
})

export class PersonalWorkersComponent implements OnInit {
  editUsr: any; oldUsr: any; editdisabled: boolean = true;
  workers: Worker[] = [];
  displayedColumns: string[] = ['action', 'WorkerPassword', 'WorkerUserName', 'Email', 'Seniority', 'JobType', 'WorkerID', 'WorkerName'];
  dataSource: any;
  worker: Worker = new Worker();

  constructor(private workerService: WorkerService, private authenticationService: AuthenticationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.workerService.getWorkersByEmployerId(this.authenticationService.employer.EmployerID).subscribe(res => {
      this.workers = res;
      console.log(this.workers);
      this.dataSource = [...this.workers];
    })
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: Worker) {
    debugger;
    this.worker.ID = 0;
    this.worker.EmployerID = this.authenticationService.employer.EmployerID;
    this.worker.WorkerName = row_obj.WorkerName;
    this.worker.WorkerID = row_obj.WorkerID;
    this.worker.JobType = row_obj.JobType;
    this.worker.Seniority = row_obj.Seniority;
    this.worker.Email = row_obj.Email;
    this.worker.WorkerUserName = row_obj.WorkerUserName;
    this.worker.WorkerPassword = row_obj.WorkerPassword;
    this.workerService.addWorker(this.worker);
    this.ngOnInit();
  }

  updateRowData(row_obj: Worker) {
    this.worker.ID = row_obj.ID;
    this.worker.EmployerID = row_obj.EmployerID;
    this.worker.WorkerName = row_obj.WorkerName;
    this.worker.WorkerID = row_obj.WorkerID;
    this.worker.JobType = row_obj.JobType;
    this.worker.Seniority = row_obj.Seniority;
    this.worker.Email = row_obj.Email;
    this.worker.WorkerUserName = row_obj.WorkerUserName;
    this.worker.WorkerPassword = row_obj.WorkerPassword;
    this.workerService.updateWorker(this.worker);
    this.ngOnInit();
  }

  deleteRowData(row_obj: Worker) {
    this.workerService.deleteWorker(row_obj.ID);
    this.ngOnInit();
  }

}
