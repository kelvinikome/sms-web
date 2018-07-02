import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class AdminStudentComponent implements OnInit {

  constructor(
    private _location: Location) { }

  back() {
    this._location.back();
  }

  ngOnInit() {
  }

}
