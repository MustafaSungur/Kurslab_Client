import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { LucideAngularModule, BookOpen, Upload } from 'lucide-angular';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { UserService } from '../../../core/Services/models/user.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    LucideAngularModule,
    NgIf,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
  ],
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  readonly BookOpenIcon = BookOpen;
  readonly uploadIcon = Upload;
  readonly bgImage = '../../../../assets/loginBG.jpg';

  registerForm: FormGroup;
  loading = false;
  error: string | null = null;
  uploadedImage: File | null = null;
  previewImageUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      birthDate: ['', Validators.required],
      imageFile: [null],
    });
  }

  handleRegister(): void {
    if (this.registerForm.invalid) return;
    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.error = 'Şifreler eşleşmiyor!';
      return;
    }

    this.loading = true;
    this.error = null;

    const formData = new FormData();
    console.log(this.registerForm.get('firstName'));
    formData.append('FirstName', this.registerForm.get('firstName')?.value);
    formData.append('LastName', this.registerForm.get('lastName')?.value);
    formData.append('BirthDate', this.registerForm.get('birthDate')?.value);
    formData.append('Password', this.registerForm.get('password')?.value);
    formData.append(
      'ConfirmPassword',
      this.registerForm.get('confirmPassword')?.value
    );
    formData.append('Email', this.registerForm.get('email')?.value);

    if (this.uploadedImage) {
      formData.append('imageFile', this.uploadedImage);
    }

    this.userService.createUser(formData).subscribe({
      next: (response) => {
        console.log('Kullanıcı başarıyla oluşturuldu:', response);
        this.loading = false;
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Bir hata oluştu:', err);
        this.loading = false;
      },
    });
  }

  onImageSelect(event: any, uploadedImage: any): void {
    this.uploadedImage = event.files[0];
    if (this.uploadedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.uploadedImage);
    }

    uploadedImage.clear();
  }
}
