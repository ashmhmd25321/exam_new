import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionServiceService } from '../../services/question-service.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(private _route:ActivatedRoute,
    private _question:QuestionServiceService,
    private _snack: MatSnackBar,private _router:Router) { }

    questionId: any;
    question: any;

  ngOnInit(): void {
    
    this.questionId = this._route.snapshot.params['questionId'];
    // alert(this.qId);
    this._question.getSingleQuestion(this.questionId).subscribe(
      (data)=> {
        this.question=data;
        console.log(this.question);
      },
      (error)=> {
        console.log('error');
      }
    )
  }

  // update subject
  public formSubmit() {
    //validate 
    this._question.updateQuestion(this.question).subscribe(
      (data)=> {
        Swal.fire("Updated", "Question successfuly updated", 'success')
      },
      (error)=> {
        Swal.fire("Error", "An error occured", "error");
      }
    )
  };

}
