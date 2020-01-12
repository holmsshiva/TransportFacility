import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { User } from './user';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	newUser = [];
	constructor(private http: HttpClient) 
	{ }

	getUsers (): Observable<User[]> {
  		return this.http.get<User[]>(apiUrl);
	}

  	register (user): Observable<User> {

		return this.http.post<User>(apiUrl, user);
	}

	login (user): Observable<User> {

		return this.http.post<User>(apiUrl, user);
	}



}
