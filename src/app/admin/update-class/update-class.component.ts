import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../shared/service/subject.service';
import { Subject } from '../../shared/model/subject-entity';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { ClassService } from '../../shared/service/class.service';
import { Location } from '@angular/common';
import { ClassEntity } from '../../shared/model/class-entity';
import { UserService } from '../../shared/service/user.service';
import { Entity } from '../../shared/model/entity';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css']
})
export class AdminUpdateClassComponent implements OnInit {

  constructor(
    private classService: ClassService,
    private subjectService: SubjectService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location) { }

  subjectList: Subject[] = [];
  classEntity: ClassEntity = new ClassEntity
  teachers: Entity[] = []

  back() {
    this._location.back();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.classService.findById(params['id']).subscribe(entity => {
        this.classEntity = entity
      })
    });
    this.subjectService.getAllEntries().subscribe(list => {
      this.subjectList = list
    })
    this.userService.getAllTeachers().subscribe(entity => {
      this.teachers = entity
    })
  }

  update() {
    this.classService.update(this.classEntity).subscribe()
    this.router.navigate(['../../class'],   {relativeTo: this.route});
  }

  delete(id){
    this.classService.remove(id).subscribe()
    this.router.navigate(['../../class'],   {relativeTo: this.route});
  }

  cancel(){
    this.router.navigate(['../../class'],   {relativeTo: this.route});
  }

}
