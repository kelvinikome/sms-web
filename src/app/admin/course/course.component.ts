import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ClassEntity } from '../../shared/model/class-entity';
import { MatPaginator, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ClassService } from '../../shared/service/class.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable"
import 'rxjs/add/observable/of';
import {MAT_DIALOG_DATA} from '@angular/material';
import { SubjectService } from '../../shared/service/subject.service';
import { Subject, SubjectType } from '../../shared/model/subject-entity';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class AdminCourseComponent implements OnInit {

  displayedColumns = ["id", "subjectCode", "subjectName", "lecturer", "action"];
  dataSource
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private subjectService: SubjectService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location) { }

  back() {
    this._location.back();
  }

  ngOnInit() {
    this.dataSource = new UserDataSource(this.subjectService);
    this.dataSource.paginator = this.paginator;
  }

  updateSubject(id): void {
    this.router.navigate(['../subject-update'],   {relativeTo: this.route});
  }

  newEntry(): void {
    let dialogRef = this.dialog.open(CreateCourseDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = new UserDataSource(this.subjectService);
    });
  }

  updateEntry(id): void {
    this.subjectService.findById(id).subscribe(entry =>{
      let dialogRef = this.dialog.open(UpdateSubjectDialog, {
        width: '320px',
        data: entry
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.dataSource = new UserDataSource(this.subjectService);
      });
    })
  }

}


@Component({
  templateUrl: 'new-course.html',
})
export class CreateCourseDialog {

  constructor(
    private subjectService: SubjectService,
    public dialogRef: MatDialogRef<CreateCourseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Subject) { }

  public subject: Subject = {
    id: 5,
    subjectCode: '',
    subjectName: '',
    coefficient: 0,
    lecturer: '',
    subjectType: SubjectType.COMPOSARY
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.subjectService.newEntry(this.subject).subscribe()
    this.dialogRef.close();
  }
}


@Component({
  templateUrl: 'update-subject.html',
})
export class UpdateSubjectDialog {

  constructor(
    private subjectService: SubjectService,
    public dialogRef: MatDialogRef<CreateCourseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Subject) { }

  public subject: Subject = JSON.parse(JSON.stringify(this.data))

  cancel(): void {
    this.dialogRef.close();
  }

  removeEntry(id){
    this.subjectService.remove(id).subscribe()
    this.dialogRef.close();
  }

  submit(): void {
    this.subjectService.update(this.subject).subscribe()
    this.dialogRef.close();
  }
}

export class UserDataSource extends DataSource<Subject> {
  subjectService: SubjectService;
  constructor(subjectService) {
    super();
    this.subjectService = subjectService
  }
  connect(): Observable<any> {this.subjectService.getAllEntries().subscribe()
    return this.subjectService.getAllEntries();
  }
  disconnect() {}
}