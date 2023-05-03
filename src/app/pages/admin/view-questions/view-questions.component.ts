import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionServiceService } from '../../services/question-service.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionServiceService,
    private _snack: MatSnackBar,
    ) { }

  qId: any;
  qTitle: any;
  questions: any;

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionsOfExamPaper(this.qId).subscribe(
      (data: any)=> {
        console.log(data);
        this.questions=data;
    }, 
      (error)=> {
        console.log(error);
    })
  }

  //delete question 
  deleteQuestion(qid: any) {
    // alert(qid);
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Do you want to delete this question?',
    }).then((result) => {
      if(result.isConfirmed) {
        this._question.deleteQuestion(qid).subscribe(
          (data) => {
            this._snack.open('Question Deleted', 'Ok', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q:any) => q.questionId != qid);
          },
          (error) => {
            this._snack.open('An Error Occured', 'Ok', {
              duration:3000
            });
          }
        );
      }
    })
  }

}
