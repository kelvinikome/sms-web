import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ClassEntity } from '../../../shared/model/class-entity';
import { MatPaginator } from '@angular/material';
import { ClassService } from '../../../shared/service/class.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable"
import 'rxjs/add/observable/of';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class AdminExaminationMenuComponent implements OnInit {

  displayedColumns = ["#", "name", "description", "action"];
  dataSource
  classes: ClassEntity[] = []

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

  animal: string;
  name: string;

  constructor(
    private classService: ClassService
  ) {}

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