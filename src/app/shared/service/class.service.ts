import { Injectable } from '@angular/core';
import { ClassEntity } from '../model/class-entity';
import { Entity } from '../model/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { MarksheetEntity } from '../model/marksheet-entity';

@Injectable()
export class ClassService {

  classes: ClassEntity[] = []
  model: ClassEntity = {
    id: 12,
    className: 'class',
    description: 'desc',
    subjectEntities: [],
    classList: [],
    classAdmin: ''
  }
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) { }

  private headers = new HttpHeaders();

  newClass(classEntity){
    return this.http.post(this.configService.baseUrl+"class", classEntity, {headers: this.headers})
  }

  remove(entity: ClassEntity){
    return this.http.delete(this.configService.baseUrl+"class/"+entity.id, {headers: this.headers})
  }

  getAllClasses(){
    return this.http.get<ClassEntity[]>(this.configService.baseUrl+"class", {headers: this.headers})
  }

  findById(id){
    return this.http.get<ClassEntity>(this.configService.baseUrl+"class/"+id, {headers: this.headers})
  }

  update(entity: ClassEntity){
    return this.http.put(this.configService.baseUrl+"class/"+entity.id, entity, {headers: this.headers})
  }
}
