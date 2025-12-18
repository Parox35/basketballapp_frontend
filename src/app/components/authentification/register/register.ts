import { Component, inject, signal } from '@angular/core';
import { Field, form } from '@angular/forms/signals';
import { UserRegister, userRegisterSchema } from '../../../models/authRegistration';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Field],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService)
  private router = inject(Router);

  private readonly registerUser = signal<UserRegister>({ firstName: '', lastName: '', email: '', password: '', passwordConfirm: '', dateOfBirth: new Date(), phoneNumber: '' });
  protected readonly registerForm = form(this.registerUser, userRegisterSchema);

  protected onSubmit(event : Event) {
    event.preventDefault();
    if (this.registerForm().valid()) {
      const userData = this.registerForm().value();
      // Here you would typically send the userData to your backend service
      this.authService.register(userData).subscribe({
        next: response => {
          console.log('Registration successful:', response);
          this.router.navigate(['/home']);
        },
        error: err => {
          console.error('Registration failed:', err);
        }
      });
    } else {
      console.log('Form is invalid:', this.registerForm().errors());
    }
  }
}
