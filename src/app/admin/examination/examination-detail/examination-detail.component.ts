import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ClassEntity } from '../../../shared/model/class-entity';
import { MatPaginator, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ClassService } from '../../../shared/service/class.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable"
import 'rxjs/add/observable/of';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-examination-detail',
  templateUrl: './examination-detail.component.html',
  styleUrls: ['./examination-detail.component.css']
})
export class AdminExaminationDetailComponent implements OnInit {

  displayedColumns = ["date", "time", "subjectName", "teacher", "action"];
  dataSource
  classes: ClassEntity[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private classService: ClassService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new UserDataSource(this.classService);
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CreateExaminationDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  templateUrl: 'dialog.html'
})
export class CreateExaminationDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateExaminationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    cancel(): void {
      this.dialogRef.close();
    }
  
    submit(): void {
      this.dialogRef.close();
    }

}

export class UserDataSource extends DataSource<any> {
  classService: ClassService;
  constructor(classService) {
    super();
    this.classService = classService
  }
  connect(): Observable<any> {
    return Observable.of(this.classService.getAllClasses());
  }
  disconnect() {}
}