import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private _http:HttpClient) { }

  //get question of exam paper id
  public getQuestionsOfExamPaper(qid:any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsOfPaperTest(qid:any) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/add`, question);
  }

  //delete question
  public deleteQuestion(questionId: any)
  {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //update question
  public updateQuestion(question: any) {
    return this._http.put(`${baseUrl}/question/`, question);
  }

  //get Single question
  public getSingleQuestion(questionId: any) {
    return this._http.get(`${baseUrl}/question/${questionId}`);
  }
}
