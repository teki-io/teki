import { BaseComponent }  from '../shared/core/index';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { LoginService, PublicPage } from '../shared/index';
const toastr = require('toastr');

@BaseComponent({
  selector: 'signup',
  directives: [ RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  templateUrl: 'app/+signup/signup.html',
  styles: [ 'app/+signup/signup.css' ]
})

@PublicPage({
  whenSignedIn: (router: Router) => router.navigateByUrl('/')
})

export class SignupComponent {
  constructor(public router: Router, private loginService: LoginService) {
  }

  signup(event: any, email: any, password: any) {
    event.preventDefault();
    this.loginService.signup(email, password)
      .subscribe(
        () => {
          this.router.parent.navigateByUrl('/');
        },
        (error: any) => {
          toastr.error(error.text());
        }
      );
  }

  login(event: any) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/login');
  }
}
