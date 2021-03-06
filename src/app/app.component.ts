import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'TransportFacility';
  isLogin;
  constructor(public authenticationService: AuthenticationService, router: Router) {
    if (authenticationService.currentUserValue) {
      	router.navigate(['/']);
    }
  }

  logout(){
  	this.authenticationService.logout();
    //this.isLogin = false;
  }
  isLoggedIn(){
    this.isLogin = localStorage.getItem('currentUser');
    if(this.isLogin!=null){
      return true;
    }{
      return false;
    }
  }
}
