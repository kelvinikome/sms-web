import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ClassEntity } from '../../../shared/model/class-entity';
import { MatPaginator, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ClassService } from '../../../shared/service/class.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable"
import 'rxjs/add/observable/of';
import {MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../../../shared/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Entity } from '../../../shared/model/entity';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {

  displayedColumns = ["id", "firstName", "lastName", "phoneNumber", "email", "action"];
  dataSource
  classes: ClassEntity[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private classService: ClassService
  ) {}

  private classId
  private classEntity: ClassEntity = new ClassEntity

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.classId = params['id']
      this.classService.findById(params['id']).subscribe(entry => this.classEntity = entry)
    });
    this.dataSource = new UserDataSource(this.userService, this.classId);
    this.dataSource.paginator = this.paginator;
  }

  removeClass(id){
    this.userService.remove(id)
  }

  createEntry(): void {
    let dialogRef = this.dialog.open(AdmitStudentDialog, {
      width: '450px',
      data: this.classId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dataSource = new UserDataSource(this.userService, this.classId);
    });
  }

  updateEntry(id): void {
    this.userService.findById(id).subscribe(entity => {
      let dialogRef = this.dialog.open(UpdateStudentDialog, {
        width: '450px',
        data: entity
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.dataSource = new UserDataSource(this.userService, this.classId);
      });
    })
  }

}

@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'admission.html',
})
export class AdmitStudentDialog {

  constructor(
    public dialogRef: MatDialogRef<AdmitStudentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) { }

  private classId: number

  ngOnInit() {
    this.classId = JSON.parse(JSON.stringify(this.data))
  }

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
    entityType: "STUDENT"
  }
  submit() {
    this.account.studentClass = ""+this.classId
    this.userService.registerStudent(this.account);
    this.dialogRef.close();
  }

}
@Component({
  templateUrl: 'update.html'
})
export class UpdateStudentDialog {

  constructor(
    public dialogRef: MatDialogRef<UpdateStudentDialog>,
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
    console.log("acc - ",this.account)
    this.userService.update(this.account).subscribe()
    this.dialogRef.close();
  }
}

export class UserDataSource extends DataSource<any> {
  userService: UserService;
  classId
  constructor(userService, classId) {
    super();
    this.classId = classId
    this.userService = userService
  }
  connect(): Observable<any> {
    return this.userService.getAllStudentsInClass(this.classId);
  }
  disconnect() {}
}