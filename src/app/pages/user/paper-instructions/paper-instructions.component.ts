import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-paper-instructions',
  templateUrl: './paper-instructions.component.html',
  styleUrls: ['./paper-instructions.component.css']
})
export class PaperInstructionsComponent implements OnInit {

  qid:any;
  quiz:any;

  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _router:Router) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    // console.log('====================================');
    // console.log(this.qid);
    // console.log('====================================');

    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>
      {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        this.quiz = data;
      },
      (error)=>
      {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        alert(error);
      }
    );

  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to Start the test?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'info',
    }).then((result) => {
      if(result.isConfirmed) {
        this._router.navigate(['/start/'+ this.qid]);
      }
    });
  }

}
