// angular
import {ControlGroup, Control} from 'angular2/common';

// app
import {FormComponent, ILang} from '../../core/index';
import {MultilingualService} from '../index';

@FormComponent({
  selector: 'lang-switcher',
  templateUrl: 'app/shared/i18n/components/lang-switcher.component.html',
  providers: [MultilingualService]
})

export class LangSwitcherComponent {
  public langForm: ControlGroup;
  public supportedLanguages: Array<ILang> = MultilingualService.SUPPORTED_LANGUAGES;
  public changeLanguage: String = 'Change Language';

  constructor(private multilang: MultilingualService) {
    this.langForm = new ControlGroup({
      lang: new Control('en')
    });
  }
  changeLang(e: any) {
    let lang = this.supportedLanguages[0].code; // fallback to default 'en'

    if (e && e.target) {
      lang = e.target.value;
    }
    this.multilang.changeLang(lang);
    this.multilang.get('setting.changeLanguage')
      .subscribe((result) => {
        this.changeLanguage = result;
      });
  }
}
