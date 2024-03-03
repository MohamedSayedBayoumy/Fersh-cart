import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  errUrl: string = '';
  loading: boolean = false;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][A-Za-z0-9]{6,20}$/),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125]{1}[0-9]{8}$/),
      ]),
    },
    { validators: this.checkRepasswordMatch }
  );

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('userToken')) localStorage.removeItem('userToken');
  }

  submitRegister() {
    if (this.registerForm.valid) {
      this.loading = true;
      this._AuthenticationService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.message === 'success') {
            this._Router.navigate(['/login']);
            this.loading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.errUrl = err.error.message;
          this.loading = false;
        },
      });
    }
  }

  checkRepasswordMatch(dataForm: any) {
    if (dataForm.get('password')?.value === dataForm.get('rePassword')?.value) {
      return null;
    } else {
      dataForm
        .get('rePassword')
        ?.setErrors({ checkPasswords: 'The password does not match' });
      return { checkPasswords: 'The password does not match' };
    }
  }
}
