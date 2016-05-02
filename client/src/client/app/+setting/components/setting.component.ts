import {BaseComponent} from '../../shared/core/index';
import {LangSwitcherComponent} from '../../shared/i18n/index';

@BaseComponent({
  selector: 'teki-setting',
  templateUrl: 'app/+setting/components/setting.component.html',
  styleUrls: ['app/+setting/components/setting.component.css'],
  directives: [LangSwitcherComponent]
})
export class SettingComponent {}
