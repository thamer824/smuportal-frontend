import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {question} from '../models/question.model'

@Injectable({
  providedIn: 'root'
})
export class BmsService {

  constructor(private httpClient: HttpClient) { }

  getquestions(): Observable<question[]> {
    return this.httpClient.get<question[]>("http://localhost:3000/api/user/getquestions");
  }
}