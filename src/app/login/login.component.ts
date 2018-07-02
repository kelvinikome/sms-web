import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityType } from '../shared/model/entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    
  }

  username: string = ""
  password: string = ""
  loginMessage: string = ""

  login(){
    this.userService.login(this.username, this.password).subscribe(
      response => {
        if (response){
          if (response.entityType == EntityType.ADMIN)
            this.router.navigate(['../admin']);
          else if (response.entityType == EntityType.TEACHER)
            this.router.navigate(['../teacher']);
          // else if (response.entityType == EntityType.STUDENT)
          //   this.router.navigate(['../student']);
          else 
            this.loginMessage = "wrong username or password"
        }
      },
      error => console.log("Server communication failed!!!", error)
    )
  }

}
