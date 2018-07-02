import { Injectable } from '@angular/core';
import { Entity, EntityType } from '../model/entity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { 
    this.users.push(this.entity)
  }

  private headers = new HttpHeaders();

  public entity: Entity = {
    id: 1,
    firstName: '',
    middleName: '',
    lastName: '',
    username: 'admin',
    password: 'admin',
    email: '',
    phoneNumber: 'string',
    sex: 'string',
    admissionDate: '',
    entityType: EntityType.ADMIN
  }

  users: Entity[] = []

  login(username, password){
    return this.http.post<Entity>(this.configService.baseUrl+"auth?username="+username+"&password="+password, {headers: this.headers})
  }

  registerTeacher(account: Entity){
    this.http.post(this.configService.baseUrl+"user/teacher", account, {headers: this.headers})
    .toPromise().then(
      response => { },
      error => console.log("Server communication failed!!!", error)
    );
  }

  registerStudent(account: Entity){
    this.http.post(this.configService.baseUrl+"user/student", account, {headers: this.headers})
    .toPromise().then(
      response => { },
      error => console.log("Server communication failed!!!", error)
    );
  }

  remove(id){
    return this.http.delete(this.configService.baseUrl+"user/"+id, {headers: this.headers})
  }

  getAllTeachers(){
    return this.http.get<Entity[]>(this.configService.baseUrl+"user/teacher", {headers: this.headers})
  }

  getAllStudents(){
    return this.http.get<Entity[]>(this.configService.baseUrl+"user/student", {headers: this.headers})
  }

  getAllStudentsInClass(classId){
    return this.http.get<Entity[]>(this.configService.baseUrl+"class/"+classId+"/student", {headers: this.headers})
  }

  findById(id){
    return this.http.get<Entity>(this.configService.baseUrl+"user/"+id, {headers: this.headers})
  }

  update(entity: Entity){
    return this.http.put(this.configService.baseUrl+"user/"+entity.id, entity, {headers: this.headers})
  }

}
