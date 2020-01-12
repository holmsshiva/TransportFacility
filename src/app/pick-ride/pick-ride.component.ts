import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm,Validators,FormArray } from '@angular/forms';

import { RideService } from '../ride.service';
import { Ride } from '../ride';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-pick-ride',
  templateUrl: './pick-ride.component.html',
  styleUrls: ['./pick-ride.component.css']
})
export class PickRideComponent implements OnInit {

  	updateForm: FormGroup;
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
	prevBookings = [];
	prevRide;
	totalSeatCount;

	constructor(
		private router: Router,
		private rideService: RideService,
		private route: ActivatedRoute,
		private authenticationService: AuthenticationService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit() {
		
		this.getRide(this.route.snapshot.params['id']);
		this.updateForm = this.formBuilder.group({
			
			'vType' : [null, Validators.required],
			'vNumber' : [null, Validators.required],
			'totalSeat' : [null, Validators.required],
			'availableSeat' : [null],
			'bookings': this.formBuilder.array([this.addBooking()])
  		});
  		//this.updateForm.setControl("bookings",this.setPrevBooking(this.prevBookings))
	}

	/*ngAfterViewChecked(){
		this.addBookingButton();
	}*/

	addBooking(): FormGroup {
	    return this.formBuilder.group({
		    'EmployeeID': [null],
			'pickupTime' : [null, Validators.required],
			'pickupLocation' : [null, Validators.required],
			'destination' : [null, Validators.required]	
	    });
	}

	setPrevBooking(bookings): FormArray {
		const formArray = new FormArray([]);
		bookings.forEach(book=>{
			formArray.push(this.formBuilder.group({
				'EmployeeID': book.EmployeeID,
				'pickupTime' : book.pickupTime,
				'pickupLocation' : book.pickupLocation,
				'destination' : book.destination	
			}));
		})
		return formArray;
	}
	getRide(id) {
		this.rideService.getRide(id).subscribe(data => {
			this.id = data.id;
			this.prevRide = data;
			this.totalSeatCount = data.totalSeat;
			this.prevBookings = data.bookings;
			this.updateForm.patchValue({
				"vType" : data.vType,
				"vNumber" : data.vNumber,
				"totalSeat" : data.totalSeat,
				'availableSeat' : data.availableSeat
			});
			console.log(this.totalSeatCount+"what is here"+this.prevBookings.length);
			//console.log(data.bookings);
			this.updateForm.setControl("bookings",this.setPrevBooking(data.bookings))
		});
		
	}

	addBookingButton(): void {
		const booking = <FormArray>this.updateForm.get("bookings");
	    booking.push(this.addBooking())
	}

	onFormSubmit(form:NgForm) {

		console.log(form);

		this.rideService.updateProduct(this.id, form)
		.subscribe(res => {
		    //let id = res['id'];

		    this.router.navigate(['/list-ride']);
		  }, (err) => {
		    console.log(err);

  		});
	}

}
