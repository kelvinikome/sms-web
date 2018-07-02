import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() { }
  
  public baseUrl = "http://localhost:8080/";

  institutionName: string = "Institution Name"
  academicYear: string = "2018/2019"
  adminUserName: string = "admin"
  adminPassword: string = "password"

  getInstitutionName(){
    return this.institutionName
  }

  setInstitutionName(name){
    this.institutionName = name
  }

  getAcademicYear(){
    return this.academicYear
  }

  setAcademicYear(year){
    this.academicYear = year
  }

  getAdminUsername(){
    return this.adminUserName
  }

  setAdminUsername(name){
    this.adminUserName = name
  }

  getAdminPassword(){
    return this.adminPassword
  }

  setAdminPassword(password){
    this.adminPassword = password
  }

}
