/**
 * Created By : Vipin Yadav 
 */

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { ValidationService } from '../../services/config/config.service';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../services/config/config.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	constructor(private formBuilder: FormBuilder, private router: Router, private _userService: UserService, private toastr: ToastrService) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, ValidationService.emailValidator]],
			password: ['', [Validators.required, ValidationService.passwordValidator]]
		});
	}

	// Check if user already logged in
	ngOnInit() {
		if (localStorage.getItem('userData')) {
			this.router.navigate(['/']);
		}
	}

	// Initicate login
	doLogin() {
		this._userService.doLogin(this.loginForm.value).subscribe(resp=>{
			localStorage.setItem('userData', JSON.stringify(resp));
			this.router.navigate(['/']);
			this.toastr.success('Logged In Successfully');
		},
		error=>{
			this.toastr.error('Invalid Credentials');
		})
	}
}

/**
 * Created By : Vipin Yadav 
 */
