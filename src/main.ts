import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { UsersService } from './app/services/users.service';
import { AuthService } from './app/services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(BrowserModule),
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    UsersService,
    AuthService,
  ],
});
