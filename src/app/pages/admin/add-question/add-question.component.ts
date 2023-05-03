import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionServiceService } from '../../services/question-service.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qId:any;
  qTitle: any;
  question: any ={
    quiz: {},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };


  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionServiceService
  ) { }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question['quiz']['qid'] =  this.qId;

  }

  formSubmit() {
    if(this.question['content'].trim()=='' || this.question['content']==null) {
      return;

    }else if(this.question['option1'].trim()=='' || this.question['option1']==null) {
      return;
    }else if(this.question['option2'].trim()=='' || this.question['option2']==null) {
      return;
    }else if(this.question['option3'].trim()=='' || this.question['option3']==null) {
      return;
    }else if(this.question['option4'].trim()=='' || this.question['option4']==null) {
      return;
    }else if(this.question['answer'].trim()=='' || this.question['answer']==null) {
      return;
    }
    this._question.addQuestion(this.question).subscribe(
      (data:any)=> {
        Swal.fire('Success', "Question Successfuly Added. Add another one.", 'success');
        // console.log(this.question);
        this.question['content'] = '';
        this.question['option1'] = '';
        this.question['option2'] = '';
        this.question['option3'] = '';
        this.question['option4'] = '';
        this.question['answer'] = '';
      },
      (error)=> {
        Swal.fire("Error", "Error adding question", "error");
      },
    )
  }

}
