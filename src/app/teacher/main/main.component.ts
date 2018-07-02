import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../shared/service/config.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class TeacherMainComponent implements OnInit {

  constructor(
    public configService: ConfigService
  ) { }

  ngOnInit() {
    
  }

}
