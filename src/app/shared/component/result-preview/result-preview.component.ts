import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ClassEntity } from '../../model/class-entity';
import { MatPaginator } from '@angular/material';
import { ClassService } from '../../service/class.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-result-preview',
  templateUrl: './result-preview.component.html',
  styleUrls: ['./result-preview.component.css']
})
export class ResultPreviewComponent implements OnInit {

  displayedColumns = ["id", "firstName", "lastName", "phoneNumber", "email", "action"];
  dataSource
  classes: ClassEntity[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new UserDataSource(this.classService);
    this.dataSource.paginator = this.paginator;
  }

  animal: string;
  name: string;

  constructor(
    private _location: Location,
    private classService: ClassService
  ) {}

  back() {
    this._location.back();
  }

  removeClass(id){
    this.classService.remove(id)
  }

}


export class UserDataSource extends DataSource<any> {
  classService: ClassService;
  constructor(classService) {
    super();
    this.classService = classService
  }
  connect(): Observable<any> {
    return Observable.of(this.classService.getAllClasses());
  }
  disconnect() {}
}