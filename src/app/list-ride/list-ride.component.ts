import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ride } from '../ride';
import { RideService } from '../ride.service';


@Component({
  selector: 'app-list-ride',
  templateUrl: './list-ride.component.html',
  styleUrls: ['./list-ride.component.css']
})
export class ListRideComponent implements OnInit {

	rides=[];

	constructor(
		private router: Router,
		private rideService: RideService,
	) { }

	ngOnInit() {
		this.rideService.getRides()
	    .subscribe(res => {
	      this.rides = res;
	      //console.log(this.rides);
	    }, err => {
	      //console.log(err);
	    });
	}
}
