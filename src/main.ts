import { bootstrapApplication } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeTh from '@angular/common/locales/th';

import { appConfig } from './app/app.config';
import { App } from './app/app';

registerLocaleData(localeTh);

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    { provide: LOCALE_ID, useValue: 'th-TH' }
  ]
}).catch((err) => console.error(err));
