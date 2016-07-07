import { BaseComponent }  from '../shared/core/index';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Auth } from '../shared/services/index';
import { PublicPage } from '../shared/index';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { ControlMessages } from '../components/control-messages/index';

@BaseComponent({
  selector: 'signup',
  directives: [ RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, ControlMessages ],
  providers: [ FormBuilder ],
  templateUrl: 'app/+signup/signup.html',
  styles: [ 'app/+signup/signup.css' ]
})

@PublicPage({
  whenSignedIn: (router: Router) => router.navigateByUrl('/')
})

export class SignupComponent {
  public signupForm: ControlGroup;

  constructor(public router: Router, public auth: Auth, fb: FormBuilder) {
    this.signupForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signup() {
    this.auth.signup(this.signupForm.value.username, this.signupForm.value.password);
  }

  login(event: any) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/login');
  }
}
