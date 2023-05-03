import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  };

  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log("Login form Submitted");

    if(this.loginData.username.trim()=='' || this.loginData.username == null) {
      this.snack.open("Username is Required", 'Ok');
      return;
    }else if(this.loginData.password.trim()=='' || this.loginData.password==null) {
      this.snack.open("Password is Required", 'Ok');
      return;
    }
      //request to server to generate token
      this.login.generateToken(this.loginData).subscribe(
        (data:any)=>{
          console.log('success');
          console.log(data);

          //Login...
          this.login.loginUser(data.token);

          this.login.getCurrentUser().subscribe(
            (user:any)=> {
              this.login.setUser(user);
              console.log(user);
              //redirrect to admin Dashboard for Admin
              //redirrect to user Dashboard for user
              if(this.login.getUserRole()=="ADMIN") {
                //admin dashboard
                // window.location.href='/admin';
                this.router.navigate(['admin'])
                this.login.loginStatusSubject.next(true);
              }else if(this.login.getUserRole()=="USER") {
                //user dashboard
                // window.location.href='/user-dashboard';
                this.router.navigate(['user-dashboard/0'])
                this.login.loginStatusSubject.next(true);
              }else {
                this.login.logout();
              }
            }
          );
        },
        (error)=>{
          console.log("Error !");
          console.log(error);
          this.snack.open("Invalid Credentials", 'Try Again');
        }
      );
  }

}
