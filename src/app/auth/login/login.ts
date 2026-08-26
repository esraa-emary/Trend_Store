import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  isSubmitting = signal(false);

  errorMessage = signal<string | null>(null);

  showPassword = signal(false);


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.form = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }


  togglePasswordVisibility(): void {

    this.showPassword.update(
      (value) => !value
    );

  }


  onSubmit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.isSubmitting.set(true);

    this.errorMessage.set(null);


    const loginData = {

      email: this.form.value.email,

      password: this.form.value.password

    };


    this.authService
      .login(loginData)
      .subscribe({

        next: () => {

          this.isSubmitting.set(false);


          if (this.authService.isAdmin()) {

            this.router.navigate([
              '/admin/dashboard'
            ]);

          } else {

            this.router.navigate(['/']);

          }

        },


        error: (error) => {

          this.isSubmitting.set(false);

          this.errorMessage.set(
            error?.error?.message ||
            'Something went wrong. Please try again.'
          );

        }

      });

  }

}