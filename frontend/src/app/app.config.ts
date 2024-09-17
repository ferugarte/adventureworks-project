import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';  
import { provideHttpClient } from '@angular/common/http';  
import { routes } from './app.routes';  // Import routes from app.routes.ts

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  // Provides routing configuration using app.routes.ts
    provideAnimations(),  // Enables animations in the application
    provideHttpClient()  // Provides HttpClient for making HTTP requests
  ]
};
