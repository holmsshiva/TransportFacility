import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm,Validators, FormArray } from '@angular/forms';

import { RideService } from '../ride.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit {

	addRideForm: FormGroup;
	uid: number;

	id: number;
	vType: string;
	vNumber: string;
	totalSeat: number;
	availableSeat: number;

	bookings: [{
		EmployeeID: number;
		pickupTime: string;
		pickupLocation: string;
		destination: string;
	}]


	constructor(
		private router: Router,
		private rideService: RideService,
		private authenticationService: AuthenticationService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit() {
		
		this.uid = JSON.parse(localStorage.getItem('currentUser'))[0].id;
		//console.log(this.uid);
		this.addRideForm = this.formBuilder.group({
			
			'vType' : [null, Validators.required],
			'vNumber' : [null, Validators.required],
			'totalSeat' : [null, Validators.required],
			'availableSeat' : [this.totalSeat-1],
			'bookings': this.formBuilder.array([this.addBooking()])
  		});
	}

	addBooking(): FormGroup {
	    return this.formBuilder.group({
		    'EmployeeID': [this.uid],
			'pickupTime' : [null, Validators.required],
			'pickupLocation' : [null, Validators.required],
			'destination' : [null, Validators.required]	
	    });
	}

	onFormSubmit(form:NgForm) {

		console.log(form);

		this.rideService.addRide(form)
		.subscribe(res => {
		    //let id = res['id'];

		    this.router.navigate(['/list-ride']);
		  }, (err) => {
		    console.log(err);

  		});
	}

}
