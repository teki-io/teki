import { BaseComponent }  from '../shared/core/index';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Auth } from '../shared/services/index';
import { PublicPage } from '../shared/index';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { ControlMessages } from '../components/control-messages/index';

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

  constructor(public router: Router, public auth: Auth, fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.auth.login(this.loginForm.value.username, this.loginForm.value.password);
  }

  signup(event:any) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/signup');
  }
}
