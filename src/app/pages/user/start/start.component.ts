import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionServiceService } from '../../services/question-service.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid:any;
  questions:any;

  marksGot=0;
  correctAnswer=0;
  attempted=0;

  isSubmit=false;

  timer: any;

  constructor(private locationst:LocationStrategy, private _route:ActivatedRoute, private _question: QuestionServiceService) { }

  ngOnInit(): void {
    // this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();
  }
  loadQuestions() {
    this._question.getQuestionsOfPaperTest(this.qid).subscribe((data:any)=> {
      console.log(data);
      this.questions = data;

      this.timer = this.questions.length * 2 * 60;

      this.questions.forEach((q:any) => {
        q['givenAnswer'] = '';
      });

      console.log(this.questions);
      this.startTimer();

    },(error)=> {
      console.log(error);
      Swal.fire('Error', "Error loading questions", "error")
    })
  }

  preventBackButton() {
    history.pushState(null, 'null', location.href);
    this.locationst.onPopState(()=> {
      history.pushState(null, 'null', location.href)
    });
  }

  reloadCurrentPage() {
    window.location.reload();
   }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit the paper?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e)=> {
      if(e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(()=>{
      //code
      if(this.timer<=0) {
        this.evalQuiz();
        clearInterval(t);
      }else {
        this.timer--;
      }
    },1000)
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    this.isSubmit = true;
        //CALCULATION
        this.questions.forEach((q: any)=> {
          if(q.givenAnswer == q.answer) {
            this.correctAnswer++;
            let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length;
            this.marksGot += marksSingle;
          }

          if(q.givenAnswer.trim()!='') {
            this.attempted++;
          }
        });

        console.log("Correct Answers : " + this.correctAnswer);
        console.log("Marks got : "+ this.marksGot);
  }

}
