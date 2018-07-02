import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SubjectService } from '../../shared/service/subject.service';
import { Subject } from '../../shared/model/subject-entity';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fill-marks-select',
  templateUrl: './fill-marks-select.component.html',
  styleUrls: ['./fill-marks-select.component.css']
})
export class TeacherFillMarksSelectComponent implements OnInit {

  constructor(
    private subjectService: SubjectService,
    private _location: Location,
    private route: ActivatedRoute
  ) { }

  classId

  back() {
    this._location.back();
  }

  subjects: Subject[] = []

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.classId = params['id']
      });
    this.subjectService.getAllEntries().subscribe(list => {
      this.subjects = list;
    })
  }


}
