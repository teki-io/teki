import { BaseComponent } from '../shared/core/index';
import { LangSwitcherComponent } from '../shared/i18n/index';
import { PrivatePage } from '../shared/index';
import { AppLayoutComponent } from '../components/app-layout/index';

@BaseComponent({
  selector: 'teki-setting',
  templateUrl: 'app/+setting/setting.html',
  styleUrls: ['app/+setting/setting.css'],
  directives: [LangSwitcherComponent, AppLayoutComponent]
})

@PrivatePage()
export class SettingComponent {}
