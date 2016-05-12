export * from './app/index';
export * from './sidebar/index';
export * from './toolbar/index';
export * from './widget/index';
export * from './widget-header/index';
export * from './widget-body/index';
export * from './widget-footer/index';
export * from './app-layout/index';

import { Widget }           from './widget/index';
import { WidgetBody }       from './widget-body/index';
import { WidgetHeader }     from './widget-header/index';

export const WIDGET_COMPONENTS: any[] = [
  Widget,
  WidgetBody,
  WidgetHeader
];
