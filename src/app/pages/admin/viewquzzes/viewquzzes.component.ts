import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-viewquzzes',
  templateUrl: './viewquzzes.component.html',
  styleUrls: ['./viewquzzes.component.css']
})
export class ViewquzzesComponent implements OnInit {

  quizzes=[
    {
      qid:23,
      title: 'Basic Java Quiz',
      description: 'Learn Java',
      maxMarks: '50',
      numberOfQuestion: '20',
      active: '',
    },
    {
      qid:25,
      title: 'Basic Python Quiz',
      description: 'Learn Python',
      maxMarks: '50',
      numberOfQuestion: '20',
      active: '',
      category: {
        title: "Programming"
      }
    },
    {
      qid:26,
      title: 'Basic C++ Quiz',
      description: '',
      maxMarks: '50',
      numberOfQuestion: '20',
      active: '',
      category: {
        title: "Programming"
      }
    },
  ]

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data:any)=> {
        this.quizzes=data;
        console.log(this.quizzes);
      },
        (error)=> {
          console.log(error);
          Swal.fire('Error', "Error loading data", 'error');
        }
    )

  };

  //delete quiz

  deleteQuiz(qid: any) {
    this._quiz.deleteQuiz(qid).subscribe(
      (data)=>{
        this.quizzes = this.quizzes.filter((quiz)=>quiz.qid != qid);
      Swal.fire('Success', 'Exam Paper Deleted', 'success');
    },
    (error)=>{
      Swal.fire('Error', "Error in deleteing Exam paper", 'error');
    }
    )
  };

}
