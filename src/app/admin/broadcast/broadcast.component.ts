import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BroadcastService } from '../../shared/service/broadcast.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css']
})
export class AdminBroadcastComponent implements OnInit {

  constructor(
    private _location: Location,
    private broadcastService: BroadcastService
  ) { }

  subject: string = ""
  recipient: string = ""
  content: string = ""


  back() {
    this._location.back();
  }

  ngOnInit() {
  }

  send() {
    this.broadcastService.sendMail(this.subject, this.recipient, this.content).subscribe(response => console.log("mail sent"))
  }

}
