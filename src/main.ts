import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/components/app/app.component';
import { environment } from '@env/environment';

if (!environment.enableConsole) {
  window.console = {
    log: () => { },
    info: () => { },
    error: () => { },
    warn: () => { },
  } as any;
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
