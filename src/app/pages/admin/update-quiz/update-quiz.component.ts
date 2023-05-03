import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../../services/category.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  categories=[{
    cid:25,
    title: 'Python Programming',
    description: "Programming is GOOD!",
  },
]; 

  constructor(private _category:CategoryService, private _route:ActivatedRoute, private _quiz:QuizService, private _router:Router) { }

  qId=0;
  quiz: any;

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error', 'Error in loading data', 'error');
    });
    
    this.qId = this._route.snapshot.params['qid'];
    // alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data)=> {
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=> {
        console.log('error');
      }
    )
  };

  // update exam paper
  public update() {
    //validate 
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=> {
        Swal.fire("Updated", "Exam paper successfuly updated", 'success').then((e)=>{
          this._router.navigate(['admin/quizzes']);
        });
      },
      (error)=> {
        Swal.fire("Error", "An error occured", "error");
      }
    )
  }

}
