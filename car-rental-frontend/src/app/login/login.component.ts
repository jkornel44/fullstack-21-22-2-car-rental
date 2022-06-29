import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCirclePlus, faPlus, faArrowRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faArrowRightToBracket = faArrowRightToBracket;
  faCirclePlus = faCirclePlus;
  faUser = faUser;
  faPlus = faPlus;
  error: any;

  loginForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  get userName() {
    return this.loginForm.get('userName') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit(): void {
  }

  async submit() {
    if (!this.loginForm.valid) {
      return;
    }

    await this.authService.login(this.loginForm.value).catch((resp) => this.error = resp.error.message);
    this.router.navigate(['/']);
  }

  toRegistration(): void {
    this.router.navigateByUrl('/registration');
  }

}
