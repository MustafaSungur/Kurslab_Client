import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { LucideAngularModule, BookOpen } from 'lucide-angular';
import { AuthService } from '../../../core/Services/auth.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    LucideAngularModule,
    NgIf,
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly BookOpenIcon = BookOpen;

  readonly bgImage = '../../../../assets/loginBG.jpg';
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  handleLogin(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = null;

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['/courses']);
      },
      error: (err: Error) => {
        this.loading = false;
        this.error = err.message;
      },
    });
  }
}
