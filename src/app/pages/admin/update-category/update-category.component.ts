import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  categories=[{
    cid:25,
    title: 'Python Programming',
    description: "Programming is GOOD!",
  },
]; 

  constructor(private _category:CategoryService, private _route:ActivatedRoute, private _router:Router) { }

  cId=0;
  category: any;

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error', 'Error in loading data', 'error');
    });
    
    this.cId = this._route.snapshot.params['cid'];
    // alert(this.qId);
    this._category.getCategory(this.cId).subscribe(
      (data)=> {
        this.category=data;
        console.log(this.category);
      },
      (error)=> {
        console.log('error');
      }
    )
  };

  // update subject
  public updateSubject() {
    //validate 
    this._category.updateCategory(this.category).subscribe(
      (data)=> {
        Swal.fire("Updated", "Subject successfuly updated", 'success').then((e)=>{
          this._router.navigate(['admin/categories']);
        });
      },
      (error)=> {
        Swal.fire("Error", "An error occured", "error");
      }
    )
  };

}
