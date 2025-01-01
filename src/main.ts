import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { UsersService } from './app/services/users.service';
import { AuthService } from './app/services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { authInterceptor, errorHandlerInterceptor } from './app/interceptors/interceptors';
import { ErrorService } from './app/services/error.service';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(BrowserModule),
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    UsersService,
    AuthService,
    authInterceptor,
    errorHandlerInterceptor, 
    ErrorService,
  ],
});
