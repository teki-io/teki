import {join} from 'path';
import {SeedConfig} from './seed.config';
import {InjectableDependency} from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    let additional_deps: InjectableDependency[] = [
      { src: 'jquery/dist/jquery', inject: 'libs' },
      { src: 'bootstrap/dist/js/bootstrap', inject: 'lib' },
      { src: 'moment/moment', inject: 'lib' },
      { src: 'toastr/build/toastr.min', inject: 'lib' },

      { src: 'bootstrap/dist/css/bootstrap.css', inject: true },
      { src: 'font-awesome/css/font-awesome.min.css', inject: true },
      { src: 'rdash-ui/dist/css/rdash.css', inject: true },
      { src: 'toastr/build/toastr.min.css', inject: true }
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);
  }
}
