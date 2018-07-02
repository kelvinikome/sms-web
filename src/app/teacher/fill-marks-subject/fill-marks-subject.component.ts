import { Component, OnInit, Inject } from '@angular/core';
import { SubjectService } from '../../shared/service/subject.service';
import { Location } from '@angular/common';
import { Subject } from '../../shared/model/subject-entity';
import { ActivatedRoute } from '@angular/router';
import { ClassEntity } from '../../shared/model/class-entity';
import { ClassService } from '../../shared/service/class.service';
import { Entity } from '../../shared/model/entity';
import { UserService } from '../../shared/service/user.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable"
import { MarksheetEntity } from '../../shared/model/marksheet-entity';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MarksheetService } from '../../shared/service/marksheet.service';

@Component({
  selector: 'app-fill-marks-subject',
  templateUrl: './fill-marks-subject.component.html',
  styleUrls: ['./fill-marks-subject.component.css']
})
export class TeacherFillMarksSubjectComponent implements OnInit {

  constructor(
    private subjectService: SubjectService,
    private classService: ClassService,
    private userService: UserService,
    private marksheetService: MarksheetService,
    private _location: Location,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  displayedColumns = ["id", "studentName", "subjectScore", "coefficient", "totalScore", "action"];
  dataSource

  classEntity: ClassEntity = new ClassEntity
  subject: Subject = new Subject
  students: Entity[] = []
  marksheetEntity: MarksheetEntity[]

  back() {
    this._location.back();
  }

  subjects: Subject[] = []

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.classService.findById(params['id']).subscribe(entity => {
        this.classEntity = entity
        console.log(entity)
      });
      this.subjectService.findById(params['subjectId']).subscribe(entity => {
        this.subject = entity
      })
      this.userService.getAllStudentsInClass(params['id']).subscribe(entity => {
        this.students = entity
      })
      this.dataSource = new UserDataSource(this.marksheetService, params['id'], params['subjectId']);
    });
    this.subjectService.getAllEntries().subscribe(list => {
      this.subjects = list;
    })
  }

  createEntry(): void {
    let dialogRef = this.dialog.open(NewMarkEntryDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dataSource = new UserDataSource(this.marksheetService, this.classEntity.id, this.subject.id);
    });
  }

  updateEntry(studentId, studentName, score) {
    console.log("show", score)
    let entry: MarksheetEntity = {
      id: "1",
      subjectId: this.subject.id,
      classNumber: null,
      studentName: studentName,
      classId: this.classEntity.id,
      studentId: studentId,
      score: score
    }
    console.log(entry)
    this.marksheetService.newMarksheetEntry(this.classEntity.id, entry).subscribe()
  }
}



@Component({
  templateUrl: 'new-entry.html',
})
export class NewMarkEntryDialog {

  constructor(
    public dialogRef: MatDialogRef<NewMarkEntryDialog>,
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

class UserDataSource extends DataSource<any> {
  marksheetService: MarksheetService;
  classId
  subjectId
  constructor(marksheetService, classId, subjectId) {
    super();
    this.classId = classId
    this.marksheetService = marksheetService
    this.subjectId = subjectId
  }
  connect(): Observable<any> {
    return this.marksheetService.getMarksheetEntriesForSubject(this.classId, this.subjectId);
  }
  disconnect() {}
}