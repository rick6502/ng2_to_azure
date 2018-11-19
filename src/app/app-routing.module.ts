import { AuthGuard } from './guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XmasListingComponent } from './xmas-listing/xmas-listing.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: 'xmas-listing', component: XmasListingComponent, canActivate:[AuthGuard]},
  {path: 'login-form', component: LoginFormComponent},
  {path: 'register', component: RegisterComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
