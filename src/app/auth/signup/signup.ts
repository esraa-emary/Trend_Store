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
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent implements OnInit {

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

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phoneNumber: [
        '',
        [
          Validators.required
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
      value => !value
    );

  }


  onSubmit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }


    this.isSubmitting.set(true);

    this.errorMessage.set(null);


    const signupData = {

      name: this.form.value.name,

      email: this.form.value.email,

      phoneNumber: this.form.value.phoneNumber,

      password: this.form.value.password

    };


    this.authService
      .signup(signupData)
      .subscribe({

        next: () => {

          this.isSubmitting.set(false);

          this.router.navigate(['/']);

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