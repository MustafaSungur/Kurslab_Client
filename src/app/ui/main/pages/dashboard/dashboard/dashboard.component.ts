import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ResourceUrlDirective } from '../../../../../core/directives/resource-url.directive';
import { UserService } from '../../../../../core/Services/models/user.service';
import { AuthService } from '../../../../../core/Services/auth.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    AvatarModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    InputTextModule,
    RouterModule,
    ResourceUrlDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  defaultProfileImage = '../../../../../assets/defaultProfile.png';
  user: any = null;
  displayProfileDialog: boolean = false;
  profileForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  userProfileData: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });

    this.userService.getUserById(this.user.userID).subscribe({
      next: (res) => {
        console.log(res);
        this.userProfileData = res;
      },
      error: (err) => console.log(err),
    });

    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      profilePhoto: [null],
    });
  }

  updateProfile() {
    if (this.profileForm.invalid) return;
    const formData = new FormData();
    formData.append('FirstName', this.profileForm.get('firstName')?.value);
    formData.append('LastName', this.profileForm.get('lastName')?.value);

    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile);
    }

    this.userService.updateUser(this.user.userID, formData).subscribe({
      next: (response) => {
        console.log(response);
        this.ngOnInit();
      },
      error: (err) => console.log(err),
    });

    this.displayProfileDialog = false;
    this.resetForm();
  }

  deleteAccount() {
    if (confirm('Hesabı Silmek istiyor musunuz?')) {
      console.log('ssas');
      this.userService.deleteUser(this.userProfileData.id).subscribe({
        next: (res) => {
          console.log('User deleted successfully:', res);
          this.authService.resetToken();
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          this.authService.resetToken();
          this.router.navigate(['/auth/login']);
        },
        complete: () => {
          console.log('Delete user request completed.');
        },
      });
    }
  }

  activateInstructor() {
    this.authService.activateInstructorRole(this.userProfileData.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate([`/instructor/${this.userProfileData.id}`]);
      },
      error: (err) => console.log(err),
    });
  }

  openDialog() {
    this.displayProfileDialog = true;
  }

  onFileSelect(event: any, imageUpload) {
    const file = event.files[0];

    this.selectedFile = file;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    imageUpload.clear();
  }

  cancelUpdate() {
    this.displayProfileDialog = false;
    this.resetForm();
  }

  resetForm() {
    this.profileForm.reset();
    this.selectedFile = null;
    this.previewUrl = null;
  }
}
