import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ClassEntity } from '../../../shared/model/class-entity';
import { MatPaginator, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ClassService } from '../../../shared/service/class.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable"
import 'rxjs/add/observable/of';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-time-table-detail',
  templateUrl: './time-table-detail.component.html',
  styleUrls: ['./time-table-detail.component.css']
})
export class AdminTimeTableDetailComponent implements OnInit {

  displayedColumns = ["id", "firstName", "lastName", "phoneNumber", "email", "action"];
  dataSource
  classes: ClassEntity[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new UserDataSource(this.classService);
    this.dataSource.paginator = this.paginator;
  }

  animal: string;
  name: string;

  constructor(
    private classService: ClassService,
    public dialog: MatDialog) {}

  removeClass(id){
    this.classService.remove(id)
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AdmitStudentDialog, {
      width: '450px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'admission.html',
})
export class AdmitStudentDialog {

  constructor(
    public dialogRef: MatDialogRef<AdmitStudentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
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