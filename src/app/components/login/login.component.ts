import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isloading: boolean = false;
  errUrl: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][A-Za-z0-9]{6,20}$/),
    ]),
  });
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('userToken')) localStorage.removeItem('userToken');
  }
  submitLogin() {
    this.isloading = true;
    if (this.loginForm.valid) {
      this._AuthenticationService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.message === 'success') {
            localStorage.setItem('userToken', response.token);
            this._AuthenticationService.decodeUserToken();
            this._Router.navigate(['/home']);
            this.isloading = false;
          }
        },
        error: (err) => {
          this.errUrl = err.error.message;
          this.isloading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
