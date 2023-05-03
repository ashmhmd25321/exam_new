import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CategoryService } from '../../services/category.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[{
    cid:25,
    title: 'Python Programming',
    description: "Programming is GOOD!",
  },
];

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestion:'',
    active:true,
    category: {
      cid:''
    },
  };

  constructor(private _category:CategoryService, private _snack:MatSnackBar, private _quiz:QuizService) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error', 'Error in loading data', 'error');
    });
  }

  //addQuiz function
  addQuiz() {
    if(this.quizData.title.trim()=='' || this.quizData.title==null) {
      this._snack.open("Title Required", "Ok")
      return
    } else if(this.quizData.description.trim()=='' || this.quizData.description==null) {
      this._snack.open("Description Required", "Ok")
      return
    } else if(this.quizData.maxMarks =='' || this.quizData.maxMarks==null) {
      this._snack.open("Maximum Marks Required", "Ok")
      return
    } else if(this.quizData.numberOfQuestion =='' || this.quizData.numberOfQuestion==null) {
      this._snack.open("Number of Questions Required", "Ok")
      return
    } else if(this.quizData.title==null) {
      this._snack.open("Select Exam Category", "Ok")
      return
    }

    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=> {
        Swal.fire("Success !!", 'Exam paper is Added Successfuly', 'success');
        this.quizData = {
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestion:'',
          active:true,
          category: {
            cid:''
          },
        };
      },
      (error)=>{
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        Swal.fire("Error !!", 'Exam paper is not added', 'error');
      }
    )
  }

}
