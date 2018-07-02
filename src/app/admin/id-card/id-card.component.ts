import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ClassEntity } from '../../shared/model/class-entity';
import { UserService } from '../../shared/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable"
import { ConfigService } from '../../shared/service/config.service';
import { ClassService } from '../../shared/service/class.service';

@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.component.html',
  styleUrls: ['./id-card.component.css']
})
export class AdminIdCardComponent implements OnInit {

  displayedColumns = ["id", "firstName", "lastName", "phoneNumber", "email", "action"];
  dataSource
  classes: ClassEntity[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private classService: ClassService,
    private _location: Location) { }

    private classId
    classEntity: ClassEntity = new ClassEntity

  back() {
    this._location.back();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.classId = params['id']
      this.classService.findById(params['id']).subscribe(entry => this.classEntity = entry)
    });
    this.dataSource = new UserDataSource(this.userService, this.classId);
    this.dataSource.paginator = this.paginator;
  }

  exportEntry(id){
    window.open(this.configService.baseUrl+"export/identity/"+id, "_blank");
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