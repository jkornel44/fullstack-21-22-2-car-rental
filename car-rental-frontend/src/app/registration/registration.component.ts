import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCirclePlus, faPlus, faArrowRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  faArrowRightToBracket = faArrowRightToBracket;
  faCirclePlus = faCirclePlus;
  faUser = faUser;
  faPlus = faPlus;
  error: any;

  regForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  get name() {
    return this.regForm.get('name') as FormControl;
  }

  get userName() {
    return this.regForm.get('userName') as FormControl;
  }

  get password() {
    return this.regForm.get('password') as FormControl;
  }

  ngOnInit(): void {
  }

  async submit() {
    if (!this.regForm.valid) {
      return;
    }

    await this.authService.registration(this.regForm.value)
      .then(() => this.router.navigate(['/']))
      .catch((resp) => this.error = resp.error.message);
  }

  goBack(): void {
    this.router.navigateByUrl('/cars');
  }

}
