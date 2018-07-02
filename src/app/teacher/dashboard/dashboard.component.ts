import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  constructor(private _location: Location,
    private route: ActivatedRoute
  ) { }

  param

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params['id'];
    });
  }

  back() {
    this._location.back();
  }

}
