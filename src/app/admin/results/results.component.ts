import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ClassEntity } from '../../shared/model/class-entity';
import { UserService } from '../../shared/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable"
import { ConfigService } from '../../shared/service/config.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class AdminResultsComponent implements OnInit {

  displayedColumns = ["id", "firstName", "lastName", "phoneNumber", "email", "action"];
  dataSource
  classes: ClassEntity[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private route: ActivatedRoute
  ) {}

  private classId

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.classId = params['id']
    });
    this.dataSource = new UserDataSource(this.userService, this.classId);
    this.dataSource.paginator = this.paginator;
  }

  exportEntry(id){
    window.open(this.configService.baseUrl+"export/results/"+id, "_blank");
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
