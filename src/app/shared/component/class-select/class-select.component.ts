import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ClassEntity } from '../../../shared/model/class-entity';
import { MatPaginator } from '@angular/material';
import { ClassService } from '../../../shared/service/class.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable"
import 'rxjs/add/observable/of';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-class-select',
  templateUrl: './class-select.component.html',
  styleUrls: ['./class-select.component.css']
})
export class ClassSelectComponent implements OnInit {

  displayedColumns = ["#", "className", "description", "action"];
  dataSource

  constructor(
    private _location: Location,
    private classService: ClassService
  ) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new UserDataSource(this.classService);
    this.dataSource.paginator = this.paginator;
  }

  back() {
    this._location.back();
  }

}

export class UserDataSource extends DataSource<ClassEntity> {
  classService: ClassService;
  constructor(classService) {
    super();
    this.classService = classService
  }
  connect(): Observable<ClassEntity[]> {
    return this.classService.getAllClasses();
  }
  disconnect() {}
}