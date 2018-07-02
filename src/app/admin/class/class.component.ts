import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator } from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from "rxjs/Observable"
import 'rxjs/add/observable/of';
import { ClassEntity } from '../../shared/model/class-entity';
import { ClassService } from '../../shared/service/class.service';
import { Location } from '@angular/common';
import { Entity } from '../../shared/model/entity';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class AdminClassComponent implements OnInit {

  displayedColumns = ["#", "className", "description", "action"];
  dataSource
  classes: ClassEntity[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new UserDataSource(this.classService);
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private classService: ClassService,
    public dialog: MatDialog,
    private _location: Location) { }

  back() {
    this._location.back();
  }

  removeClass(id){
    this.classService.remove(id)
  }

  createEntry(): void {
    let dialogRef = this.dialog.open(CreateClassDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dataSource = new UserDataSource(this.classService);
    });
  }

}

@Component({
  selector: 'create-class-dialog',
  templateUrl: 'new-class.html',
})
export class CreateClassDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateClassDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ClassEntity,
    private classService: ClassService
  ) { }

  public classEntity: ClassEntity = {
    id: null,
    className: '',
    description: '',
    subjectEntities: [],
    classList: [],
    classAdmin: ''
  }

  cancel(): void {
    this.dialogRef.close();
  } 

  removeEntity(id){
    this.classService.remove(id).subscribe()
    this.dialogRef.close();
  }

  submit() {
    console.log(this.classEntity)
    this.classService.newClass(this.classEntity).subscribe()
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
    return this.classService.getAllClasses();
  }
  disconnect() {}
}