import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private login:LoginService ,private userService:UserService, private _router:Router ,private snack:MatSnackBar) { }

  public user={
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log(this.user);
    if (this.user.username=='' || this.user.username==null) {
      // alert('User is required!!');
      this.snack.open("Username is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    }else if (this.user.password=='' || this.user.password==null) {
      // alert('Password is required!!');
      this.snack.open("Password is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    }else if (this.user.firstName=='' || this.user.firstName==null) {
      // alert('First Name is required!!');
      this.snack.open("First Name is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    }else if (this.user.lastName=='' || this.user.lastName==null) {
      // alert('Last Name is required!!');
      this.snack.open("Last Name is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    }else if (this.user.email=='' || this.user.email==null) {
      // alert('Email is required!!');
      this.snack.open("Email is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    }else if (this.user.phone=='' || this.user.phone==null) {
      // alert('Phone Number is required!!');
      this.snack.open("Phone Number is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    }

    //validation

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        // alert('User Registered Successfully');
        Swal.fire('Updated', 'Updated Successfully', 'success').then((e)=>{
          this._router.navigate(['login']);
        });
      },
      (error)=>{
        //error
        console.log(error);
        // alert('Something went wrong');
        this.snack.open("Something Went Wrong", 'ok', {
          verticalPosition: 'bottom',
        })
      }
    )
  }

}
