import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()
export class BroadcastService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  private headers = new HttpHeaders();

  sendMail(subject, recipient, content){
    return this.http.post(this.configService.baseUrl+"broadcast/mail?subject="+subject+"&recipient="+recipient, content, {headers: this.headers})
  }

}
