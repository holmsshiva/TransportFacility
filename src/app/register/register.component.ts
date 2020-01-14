import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm,Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;

	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: number;
	password: string;


	constructor(
		private router: Router,
		private userService: UserService,
		private authenticationService: AuthenticationService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			'firstName' : [null, Validators.required],
			'lastName' : [null, Validators.required],
			'email' : [null, Validators.required],
			'phone' : [null, Validators.required],
			'password' : [null, Validators.required]
  		});
	}

    onFormSubmit(form:NgForm) {

		this.userService.register(form)
		.subscribe(res => {
		    let id = res['id'];

		    this.router.navigate(['/login']);
		  }, (err) => {
		    console.log(err);

  		});
	}

}
