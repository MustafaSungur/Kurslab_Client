import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from '../../../../Services/models/user.service';
import { AuthService } from '../../../../Services/auth.service';
import { environment } from '../../../../../environments/environment';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ResourceUrlDirective } from '../../../../directives/resource-url.directive';
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
export class DashboardComponent {
  defaultProfileImage = '../../../../../assets/defaultProfile.png';
  user: any = null;
  displayProfileDialog: boolean = false;
  profileForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      profilePhoto: [null],
    });
  }

  updateProfile() {
    const formData = new FormData();
    formData.append('FirstName', this.profileForm.get('firstName')?.value);
    formData.append('LastName', this.profileForm.get('lastName')?.value);

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }
    console.log(formData.get('FirstName'));

    this.userService.updateUser(this.user.userID, formData).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
    });

    this.displayProfileDialog = false;
    this.resetForm();
  }

  deleteAccount() {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      console.log('Account Deleted');
    }
  }

  activateInstructor() {
    console.log('Instructor Role Activated');
  }

  openDialog() {
    this.displayProfileDialog = true;
  }

  // Handle file selection
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
