import { Router } from 'angular2/router';
import { LoginService } from './login';
import { Injectable, Inject } from 'angular2/core';

const toastr = require('toastr');
toastr.options.preventDuplicates = true;

@Injectable()
export class HttpErrorHandler {
  constructor(@Inject(Router) public router:Router, @Inject(LoginService) public loginService: LoginService) {}

  handle(error:any) {
    if (error.status === 401) {
      toastr.error('Please sign in');
      this.loginService.logout();
      this.router.navigate(['/Login']);
    }
  }
}
