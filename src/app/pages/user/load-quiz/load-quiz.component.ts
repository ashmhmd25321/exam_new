import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:any;

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
  ) { }

  ngOnInit(): void {
    
    // console.log(this.catId);

    this._route.params.subscribe((params)=>{
      this.catId = params['catId'];

      if(this.catId==0) {
        console.log("Load All the Quiz");
  
        this._quiz.getActiveQuizzes().subscribe(
          (data:any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            console.log(error);
            alert("Error loading");
          }
        )
  
      } else {
        // console.log("Load quiz with the id");
        
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data)=>
          {
            this.quizzes=data;
          },
          (error)=> {
            alert("error in loading exam paper");
          }
        )
      }

    })
  }

}
