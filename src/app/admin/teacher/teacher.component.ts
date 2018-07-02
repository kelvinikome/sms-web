import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ClassEntity } from '../../shared/model/class-entity';
import { MatPaginator, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ClassService } from '../../shared/service/class.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable"
import 'rxjs/add/observable/of';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Location } from '@angular/common';
import { Entity, EntityType } from '../../shared/model/entity';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class AdminTeacherComponent implements OnInit {

  displayedColumns = ["id", "firstName", "lastName", "phoneNumber", "email", "action"];
  dataSource
  classes: ClassEntity[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new UserDataSource(this.userService);
    this.dataSource.paginator = this.paginator;
  }

  animal: string;
  name: string;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private _location: Location) { }

  back() {
    this._location.back();
  }

  admitDialog(): void {
    let dialogRef = this.dialog.open(AdmitTeacherDialog, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = new UserDataSource(this.userService);
    });
  }

  editDialog(id): void {
    this.userService.findById(id).subscribe(entity => {
      let dialogRef = this.dialog.open(UpdateTeacherDialog, {
        width: '450px',
        data: entity
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.dataSource = new UserDataSource(this.userService);
      });
    })
  }

}

@Component({
  templateUrl: 'admission.html'
})
export class AdmitTeacherDialog {

  constructor(
    public dialogRef: MatDialogRef<AdmitTeacherDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) { }

  cancel(): void {
    this.dialogRef.close();
  }

  public account: Entity = {
    id: 1,
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    sex: '',
    studentClass: '',
    teacherClass: [],
    admissionDate: '',
    entityType: "TEACHER"
  }
  submit() {
    this.userService.registerTeacher(this.account);
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: 'update.html'
})
export class UpdateTeacherDialog {

  constructor(
    public dialogRef: MatDialogRef<UpdateTeacherDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Entity,
    private userService: UserService
  ) { }

  public account: Entity = JSON.parse(JSON.stringify(this.data))

  cancel(): void {
    this.dialogRef.close();
  } 

  removeEntity(id){
    this.userService.remove(id).subscribe()
    this.dialogRef.close();
  }

  submit() {
    this.userService.update(this.account).subscribe()
    this.dialogRef.close();
  }
}

export class UserDataSource extends DataSource<any> {
  userService: UserService;
  constructor(userService) {
    super();
    this.userService = userService
  }
  connect(): Observable<any> {
    return this.userService.getAllTeachers();
  }
  disconnect() {}
}