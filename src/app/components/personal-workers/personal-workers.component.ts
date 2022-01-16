import { Component, OnInit, ViewChild } from '@angular/core';
import Worker from 'src/app/classes/worker';
import { WorkerService } from 'src/app/services/worker.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import Employer from 'src/app/classes/employer';
import { MatTable } from '@angular/material/table';


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
  employer: Employer = new Employer();

  constructor(private workerService: WorkerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    const employer = localStorage.getItem('employer');
    if (employer)
      this.employer = JSON.parse(employer);
    this.workerService.getWorkersByEmployerId(this.employer.EmployerID).subscribe(res => {
      this.workers = res;
      this.dataSource = [...this.workers];
    })
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
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
    this.worker.EmployerID = this.employer.EmployerID;
    this.worker.WorkerName = row_obj.WorkerName;
    this.worker.WorkerID = row_obj.WorkerID;
    this.worker.JobType = row_obj.JobType;
    this.worker.Seniority = row_obj.Seniority;
    this.worker.Email = row_obj.Email;
    this.worker.WorkerUserName = row_obj.WorkerUserName;
    this.worker.WorkerPassword = row_obj.WorkerPassword;
    this.workerService.addWorker(this.worker).subscribe(res => window.location.reload());
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
    this.workerService.updateWorker(this.worker).subscribe(res => window.location.reload());
  }

  deleteRowData(row_obj: Worker) {
    this.workerService.deleteWorker(row_obj.ID).subscribe(() => window.location.reload());
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
}
