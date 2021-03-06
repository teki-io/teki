import {join} from 'path';
import {SeedConfig} from './seed.config';
import {InjectableDependency} from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
     this.APP_TITLE = 'Teki';
    let additional_deps: InjectableDependency[] = [
      { src: 'jquery/dist/jquery', inject: 'libs' },
      { src: 'moment/moment', inject: 'libs' },
      { src: 'moment/locale/zh-tw', inject: 'libs' },
      { src: 'toastr/build/toastr.min', inject: 'libs' },
      { src: 'ng2-bootstrap/bundles/ng2-bootstrap', inject: 'libs'},
      { src: 'dragula/dist/dragula', inject: 'libs' },

      { src: 'bootstrap/dist/css/bootstrap.css', inject: true },
      { src: 'font-awesome/css/font-awesome.min.css', inject: true },
      { src: 'rdash-ui/dist/css/rdash.css', inject: true },
      { src: 'toastr/build/toastr.min.css', inject: true },
      { src: 'dragula/dist/dragula.min.css', inject: true }
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);

    this.FONTS_DEPENDENCIES = [
      'node_modules/font-awesome/fonts/*',
      'node_modules/rdash-ui/dist/fonts/*',
      this.FONTS_SRC
    ];

    this.APP_ASSETS = [
      { src: `${this.CSS_SRC}/glyphicons.css`, inject: true, vendor: false },
      ...this.APP_ASSETS
    ];
  }
}
