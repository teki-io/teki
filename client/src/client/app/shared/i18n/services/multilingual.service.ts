import {Injectable} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {ILang} from '../../core/index';

@Injectable()
export class MultilingualService {

  public static SUPPORTED_LANGUAGES: Array<ILang> = [
    { code: 'en', title: 'English' },
    { code: 'zh-tw', title: '繁體中文' }
  ];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  public changeLang(lang: string) {
    this.translate.use(lang);
  }
}
