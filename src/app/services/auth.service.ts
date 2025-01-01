import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = environment.api.url;
  private readonly localStorageKey = 'access_token';

  constructor(private readonly http: HttpClient, public readonly router: Router) {}

  login(credentials: { email: string; password: string }): Observable<{ token: any }> {

    return this.http.post<{ token: string }>(`${this.endpoint}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.localStorageKey, response.token);
          localStorage.setItem('userMail', credentials.email);
          this.router.navigate(['/recetas']);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('userMail');
    localStorage.removeItem(this.localStorageKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.localStorageKey);
  }
}
