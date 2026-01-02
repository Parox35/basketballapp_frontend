import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../../models/authRegistration';
import { AuthResponseDto,  } from '../../models/dto/authResponseDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  private readonly headers = { 'Content-Type': 'application/json' };

  // Check if user is authentificated
  isAuthentificated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/is-auth`, {
      withCredentials: true,
      headers: this.headers
    });
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
    });
  };
}
