
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { ApplicationModule } from './application/application.module';

if (environment.production) {
  enableProdMode();
}

import 'hammerjs';

platformBrowserDynamic().bootstrapModule(ApplicationModule).catch(err => console.error(err));
