import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListRideComponent } from './list-ride/list-ride.component';
import { AddRideComponent } from './add-ride/add-ride.component';
import { PickRideComponent } from './pick-ride/pick-ride.component';
import { AuthGuard } from './auth.guard'; 
 
const routes: Routes = [
	{ 
		path: '', 
		component: ListRideComponent, 
		//canActivate: [AuthGuard] 
	},
	{ 
		path: 'add-ride', 
		component: AddRideComponent, 
		canActivate: [AuthGuard] 
	},
	{ 
		path: 'pick-ride/:id', 
		component: PickRideComponent, 
		canActivate: [AuthGuard] 
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{ 
		path: '**', 
		redirectTo: '' 
	}
	 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
