import { Component, signal, inject } from '@angular/core';
import { Field, form, minLength, required } from '@angular/forms/signals';
import { AuthService } from '../../../services/authService/auth-service';
import { Router } from '@angular/router';
import { min } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [Field],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  private readonly loginAccount = signal<{ email: string; password: string }>({ email: '', password: '' });
  protected readonly loginForm = form(this.loginAccount, (context) => {
    // Email is required
    required(context.email, { message: 'Email est requis' });
    // Password is required
    required(context.password, { message: 'Mot de passe requis' });
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (this.loginForm().valid()) {
      const { email, password } = this.loginForm().value();
      this.authService.login(email, password).subscribe({
        next: response => {
          console.log('Login successful:', response);
          this.router.navigate(['/home']);
        },
        error: err => {
          console.error('Login failed:', err);
        }
      });
    } else {
      console.log('Form is invalid:', this.loginForm().errors());
    }
  }
}
