import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { MarksheetEntity } from '../model/marksheet-entity';

@Injectable()
export class MarksheetService {

  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) { }

  private headers = new HttpHeaders();

  newMarksheetEntry(classId, entry) {
    return this.http.post(this.configService.baseUrl+"class/"+classId+"/marksheet", 
                          entry, {headers: this.headers})
  }

  getMarksheetEntries(classId){
    return this.http.get<MarksheetEntity[]>(this.configService.baseUrl+"class/"+classId+"/marksheet",
                                           {headers: this.headers})
  }

  getMarksheetEntriesForSubject(classId, subjectId){
    return this.http.get<MarksheetEntity[]>(this.configService.baseUrl+"class/"+classId+"/marksheet/"+subjectId,
                                           {headers: this.headers})
  }

}
