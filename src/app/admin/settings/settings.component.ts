import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../shared/service/config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class AdminSettingsComponent implements OnInit {

  constructor(
    configService: ConfigService
  ) { }

  ngOnInit() {
  }

}
