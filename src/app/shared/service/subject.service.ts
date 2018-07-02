import { Injectable } from '@angular/core';
import { Subject } from '../model/subject-entity';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()
export class SubjectService {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) { }

  private headers = new HttpHeaders();

  newEntry(entry){
    return this.http.post(this.configService.baseUrl+"subject", entry, {headers: this.headers})
  }

  remove(id){
    return this.http.delete(this.configService.baseUrl+"subject/"+id, {headers: this.headers})
  }

  getAllEntries(){
    return this.http.get<Subject[]>(this.configService.baseUrl+"subject", {headers: this.headers})
  }

  findById(id){
    return this.http.get<Subject>(this.configService.baseUrl+"subject/"+id, {headers: this.headers})
  }

  update(entry: Subject){
    return this.http.put(this.configService.baseUrl+"subject/"+entry.id, entry, {headers: this.headers})
  }

}
