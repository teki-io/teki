import { Directive, ViewContainerRef, DynamicComponentLoader } from '@angular/core';
import { Router, RouterOutlet, ComponentInstruction } from '@angular/router-deprecated';
import { makeDecorator } from '@angular/core/src/util/decorators';
import { reflector } from '@angular/core/src/reflection/reflection';
import { Auth } from '../../services/index';

@Directive({
  selector: 'teki-router-outlet'
})

export class SecurityRouterOutlet extends RouterOutlet {

  private parentRouter: Router;

  constructor(_elementRef:ViewContainerRef, _loader:DynamicComponentLoader,
              _parentRouter:Router, nameAttr:string,
              private auth: Auth) {
    super(_elementRef, _loader, _parentRouter, nameAttr);
    this.parentRouter = _parentRouter;
  }

  activate(next:ComponentInstruction):Promise<any> {
    const publicPageMeta = reflector.annotations(next.componentType)
      .filter(a => a instanceof PublicPageMetadata)[0];
    if (publicPageMeta) {
      if (!this.auth.isSignedIn) return super.activate(next);
      if (!publicPageMeta.whenSignedIn) return super.activate(next);
      publicPageMeta.whenSignedIn(this.parentRouter);
      return super.activate(next);
    }

    const privatePageMeta = reflector.annotations(next.componentType)
      .filter(a => a instanceof PrivatePageMetadata)[0];
    if (privatePageMeta) {
      if (this.auth.isSignedIn) return super.activate(next);
      privatePageMeta.whenNotSignedIn(this.parentRouter);
      return;
    }

    return super.activate(next);
  }
}

class PublicPageMetadata {

  whenSignedIn:(router:Router) => void;

  constructor({whenSignedIn}:{whenSignedIn?:(router:Router) => void} = {}) {
    this.whenSignedIn = whenSignedIn;
  }

}
export const PublicPage = makeDecorator(PublicPageMetadata);

class PrivatePageMetadata {

  whenNotSignedIn:(router:Router) => void;

  constructor({whenNotSignedIn}:{whenNotSignedIn?:(router:Router) => void} = {
    whenNotSignedIn: (r) => {
      r.navigateByUrl('/login');
    }
  }) {
    this.whenNotSignedIn = whenNotSignedIn;
  }
}
export const PrivatePage = makeDecorator(PrivatePageMetadata);
