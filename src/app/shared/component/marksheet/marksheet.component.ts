import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClassEntity } from '../../model/class-entity';
import { ClassService } from '../../service/class.service';
import { Entity } from '../../model/entity';
import { UserService } from '../../service/user.service';
import { SubjectService } from '../../service/subject.service';
import { Subject } from '../../model/subject-entity';
import { MarksheetService } from '../../service/marksheet.service';
import { MarksheetEntity } from '../../model/marksheet-entity';

@Component({
  selector: 'app-marksheet',
  templateUrl: './marksheet.component.html',
  styleUrls: ['./marksheet.component.css']
})
export class MarksheetComponent implements OnInit {

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private classService: ClassService,
    private userService: UserService,
    private subjectService: SubjectService,
    private marksheetService: MarksheetService
  ) { }

  classEntity: ClassEntity = new ClassEntity
  studentEntities: Entity[] = []
  subjectEntities: Subject[] = []
  fetchData: boolean = false
  tableEntries: string[] = []
  marksheetEntries: MarksheetEntity[] = []

  ngOnInit() {
    this.route.params.subscribe(params => {
        console.log(params['id'])
        this.classService.findById(params['id']).subscribe(entity => {
          this.classEntity = entity
        })
        this.userService.getAllStudentsInClass(params['id']).subscribe(students => {
          this.studentEntities = students
          this.fetchData = true;
        })
        this.subjectService.getAllEntries().subscribe(entries => {
          this.subjectEntities = entries
        })
        this.marksheetService.getMarksheetEntries(params['id']).subscribe(entries => {
          this.marksheetEntries = entries
        })
      });
    console.log(this.classEntity, this.fetchData)
  }

  back() {
    this._location.back();
  }

  getTotalScoreForSubject(subjectId, studentId){
    for (let entry of this.marksheetEntries)
      if ((entry.subjectId == subjectId)&&( entry.studentId == studentId))
        for (let subject of this.subjectEntities)
          if (subject.id == entry.subjectId)
            return entry.score * subject.coefficient
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}
