// angular
import {Injectable} from 'angular2/core';

// libs
import {Observable} from 'rxjs/Observable';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {ILang} from '../../core/index';

// service
@Injectable()
export class MultilingualService {

  // default supported languages
  // see main.ts bootstrap for example of how to provide different value
  public static SUPPORTED_LANGUAGES: Array<ILang> = [
    { code: 'en', title: 'English' },
    { code: 'zh-TW', title: '繁體中文' }
  ];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  public changeLang(lang: string) {
    this.translate.use(lang);
  }

  public get(userLang: string): Observable<any> {
    return this.translate.get(userLang);
  }
}
