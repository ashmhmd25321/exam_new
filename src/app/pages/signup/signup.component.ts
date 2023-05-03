import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private snack:MatSnackBar) { }

  public user={
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
        Swal.fire('Registered Successfully', 'User id is '+data.id, 'success');
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
