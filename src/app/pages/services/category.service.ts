import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  //load all the subject
  public categories() {
    return this._http.get(`${baseUrl}/category/`);
  }

  //add subject
  public addCategory(category:any) {
    return this._http.post(`${baseUrl}/category/`, category);
  }

  //delete subject
  public deleteCategory(cid:any) {
    return this._http.delete(`${baseUrl}/category/${cid}` );
  }

  //get subject by id
  public getCategory(cId: any) {
    return this._http.get(`${baseUrl}/category/${cId}`)
  }

  //update subject
  public updateCategory(category: any) {
    return this._http.put(`${baseUrl}/category/`, category);
  }
}
