import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  showFirststep: boolean = true;
  showNextStep: boolean = false;
  showfinalstep: boolean = false;
  userEmail: string = '';
  resetCode: string = '';
  forgetPassordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  resetPasswordForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });
  loginForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][A-Za-z0-9]{6,20}$/),
    ]),
  });
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) {}

  forgetPassword(data: any) {
    this._AuthenticationService
      .forgetPassword(data.get('email')?.value)
      .subscribe({
        next: (respose) => {
          console.log(respose);
          this.userEmail = data.get('email')?.value;
          if (respose.statusMsg === 'success') {
            this.showFirststep = false;
            this.showNextStep = true;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  verfiyResetCode(data: any) {
    this._AuthenticationService
      .resetPassword(data.get('resetCode')?.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.showNextStep = false;
          this.showfinalstep = true;
        },
        error: (err) => {
          console.log(this.resetCode);
          console.log(err);
        },
      });
  }

  newDataLogin() {
    let myNewForm = this.loginForm.value;
    myNewForm.email = this.userEmail;
    console.log(myNewForm);

    this._AuthenticationService.loginWithNewPassword(myNewForm).subscribe({
      next: (response) => {
        console.log(response);
        if (response.token) {
          localStorage.setItem('userToken', response.token);
          this._AuthenticationService.userLoginData.next(response.token);
          this._Router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
