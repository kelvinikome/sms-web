import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassService } from '../../shared/service/class.service';
import { ClassEntity } from '../../shared/model/class-entity';
import { MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable";
import { Location } from '@angular/common';
import { UserService } from '../../shared/service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class TeacherClassListComponent implements OnInit {

  displayedColumns = ["id", "firstName", "lastName", "phoneNumber", "email", "action"];
  dataSource
  classes: ClassEntity[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _location: Location,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataSource = new UserDataSource(this.userService, params['id']);
      this.dataSource.paginator = this.paginator;
    });
  }

  back() {
    this._location.back();
  }

  removeClass(id){
    this.userService.remove(id)
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