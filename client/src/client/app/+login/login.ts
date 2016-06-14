import { BaseComponent }  from '../shared/core/index';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { LoginService, PublicPage } from '../shared/index';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { ControlMessages } from '../components/control-messages/index';
const toastr = require('toastr');

@BaseComponent({
  selector: 'login',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, ControlMessages],
  providers: [FormBuilder],
  templateUrl: 'app/+login/login.html',
  styleUrls: ['app/+login/login.css']
})

@PublicPage()
export class LoginComponent {
  public loginForm: ControlGroup;

  constructor(public router: Router, public loginService: LoginService, fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(() => {
        this.router.parent.navigateByUrl('/');
      }, this.handleError);
  }

  signup(event:any) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/signup');
  }

  handleError(error:any):void {
    if (error && error.status === 401) {
      toastr.error('Email or password is wrong.');
    }
  }
}
