import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable ,of } from 'rxjs';
import { catchError, map  } from 'rxjs/operators';

import { User } from './user';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}
	
	private handleError<T> (operation='operation', result?: T){

		return (error: any) : Observable <T> => {
			console.log(error);

			return of(result as T);
		}

  	}

	public get currentUserValue(): User {
		//console.log(this.currentUserSubject.value)
		return this.currentUserSubject.value;
	}
	 
	login(user): Observable<any> {
		//console.log(user)
		const url = `${apiUrl}?email=${user.email}&password=${user.password}`;
		//console.log(url)

		return this.http.get<any>(url)
			.pipe(map(user => {
					if (user) {
					// store user details in local storage to keep user logged in
					localStorage.setItem('currentUser', JSON.stringify(user));
					this.currentUserSubject.next(user);
					}
					return user;
				}),
				catchError(this.handleError<User>(`Result`))
			);
	}
	 
	logout() {
		// remove user data from local storage for log out
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}
}
