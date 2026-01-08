import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, of, tap } from 'rxjs';
import { UserRegister } from '../../models/authRegistration';
import { AuthResponseDto,  } from '../../models/dto/authResponseDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  private readonly headers = { 'Content-Type': 'application/json' };
  readonly isAuthenticated = signal<boolean>(false);


  // Check if user is authenticated
  authenticateState(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/is-auth`, {
      withCredentials: true,
      headers: this.headers
    }).pipe(
      map( () => true),
      catchError( () => of(false)),
      tap( isAuth => this.isAuthenticated.set(isAuth) )
    );
  };

  // Creation of a new user
  register(userRegister: UserRegister): Observable<AuthResponseDto> {
    const { passwordConfirm, ...userData } = userRegister; // Exclude passwordConfirm
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/register`, userData, {
        withCredentials: true,
        headers: this.headers
      });
  };

  // Authenticate user and start session
  login(email: string, password: string): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/login`, { email, password }, {
      withCredentials: true,
      headers: this.headers
    }).pipe(
        tap( () => this.isAuthenticated.set(true)
      ) 
    );
  };

  // End user session
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {
      withCredentials: true,
      headers: this.headers
    }).pipe(
        tap( () => this.isAuthenticated.set(false)
      )
    );
  }
}
