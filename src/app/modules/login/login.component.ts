import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { CustomResponse } from 'src/app/shared/constants/custom-response.model';
import { NavigationService } from 'src/app/shared/navigations/navigation.service';
import { LocalstorageService } from 'src/app/shared/storage/localstorage.service';
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  submitted: boolean = false;

  nn_logo : string = "/assets/images/Logo_blue_black.png";

  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private navigation: NavigationService,
    private app: AppComponent,
    private storage: LocalstorageService
  ) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
        password: ['', Validators.required]
      })
  }

  ngOnInit(): void {
    this.app.isRefreshed = true;
    this.storage.clearStorage();
  }

  get from() { return this.loginForm.controls; }


  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authentication.login(this.loginForm.value.email,this.loginForm.value.password , 0, (response: CustomResponse) => {
      if (response.type == 'success') {
        this.app.topHeader = true;
        this.app.leftMenu = true;
        this.app.loadPage = true;
        this.navigation.navigateTo('dashboard');
      }
    })
  }

  reloadPage(): void {
  }

}
