import { BaseComponent }  from '../shared/core/index';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { LoginService, PublicPage } from '../shared/index';
const toastr = require('toastr');

@BaseComponent({
  selector: 'login',
  directives: [ RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  templateUrl: 'app/+login/login.html',
  styleUrls: ['app/+login/login.css']
})

@PublicPage()
export class LoginComponent {
  constructor(public router: Router, public loginService: LoginService) {
  }

  login(event:any, email:string, password:string) {
    event.preventDefault();
    this.loginService.login(email, password)
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
