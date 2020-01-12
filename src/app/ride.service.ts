import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Ride } from './ride';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/rides';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  	constructor(
  		private http: HttpClient
  	) { }

  	addRide (ride): Observable<Ride> {

		return this.http.post<Ride>(apiUrl, ride);
	}

	getRides(){
		return this.http.get<any>(apiUrl);
	}

	getRide(id: number): Observable<Ride> {
	  const url = `${apiUrl}/${id}`;
	  return this.http.get<Ride>(url)
	}

	updateProduct (id, product): Observable<any> {

	  const url = `${apiUrl}/${id}`;
	  return this.http.put(url, product, httpOptions)

	}
}
