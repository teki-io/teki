import { Router } from '@angular/router-deprecated';
import { LoginService } from './login';
import { Injectable, Inject } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

const toastr = require('toastr');
toastr.options.preventDuplicates = true;

@Injectable()
export class HttpErrorHandler {
  constructor(@Inject(Router) public router:Router,
              @Inject(LoginService) public loginService: LoginService,
              private translate: TranslateService) {}

  handle(error:any) {
    if (error.status === 401) {
      this.translate.get('error.pleaseSignIn').subscribe((msg: string) => toastr.error(msg));
      this.loginService.logout();
      this.router.navigate(['/Login']);
    }

    if (error.status === 422) {
      let msg:string = _.chain(error.json()).values().first().value();
      toastr.error(msg);
    }
  }
}
