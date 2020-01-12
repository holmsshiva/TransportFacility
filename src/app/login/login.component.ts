import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm,Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	email: string;
	password: string;

	constructor(
		private router: Router,
		private userService: UserService,
		private authenticationService: AuthenticationService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			'email' : ['', Validators.required],
			'password' : ['', Validators.required]
  		});
	}

	onFormSubmit(form:NgForm) {

		//console.log(form);

		this.authenticationService.login(form)
		.subscribe(res => {
		    //let id = res['id'];
		    //console.log(res);
		    this.router.navigate(['/list-ride']);
		  }, (err) => {
		    console.log(err);

  		});
	}

}
