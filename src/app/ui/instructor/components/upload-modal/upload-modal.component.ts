import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeSelectModule } from 'primeng/treeselect';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ContentService } from '../../../../core/Services/models/content.service';
import { AuthService } from '../../../../core/Services/auth.service';
@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    AvatarModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    InputTextModule,
    RouterModule,
    MultiSelectModule,
    TreeSelectModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './upload-modal.component.html',
  styleUrl: './upload-modal.component.css',
})
export class UploadModalComponent implements OnInit {
  loading = false;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  user: any;
  courseForm: FormGroup;
  @Input() categories: any = [];
  @Input() tags: any = [];
  @Input() reloadData: any;

  previewImageUrl: string | null = null;
  previewVideoUrl: string | null = null;
  selectedImage: File;
  selectedVideo: File;

  constructor(
    private fb: FormBuilder,
    private contentService: ContentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      category: [null, Validators.required],
      tags: [[], Validators.required],
    });
  }

  handleTagChange(event: any) {
    const selected = event.value;
    if (selected.length > 3) {
      this.courseForm.controls['tags'].setValue(selected.slice(0, 3));
    }
  }

  onVideoUpload(event: any, videoUpload: any) {
    this.selectedVideo = event.files[0];

    if (this.selectedVideo) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewVideoUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedVideo);
    }

    videoUpload.clear();
  }

  onImageUpload(event: any, imageUpload: any) {
    this.selectedImage = event.files[0];
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }

    imageUpload.clear();
  }

  handleUpload() {
    if (this.courseForm.valid) {
      const formData = new FormData();

      // Required fields
      formData.append('Title', this.courseForm.get('title')?.value);
      formData.append('Description', this.courseForm.get('description')?.value);
      formData.append('UserId', this.user.userID);
      formData.append(
        'CategoryId',
        String(this.courseForm.get('category')?.value?.key)
      );

      const tagIds =
        this.courseForm.get('tags')?.value?.map((tag: any) => tag.key) || [];
      tagIds.forEach((tagId: number) => {
        formData.append('TagIds', String(tagId)); // Append each tag ID
      });

      if (this.selectedImage) {
        formData.append('imageFile', this.selectedImage);
      }
      if (this.selectedVideo) {
        formData.append('videoFile', this.selectedVideo);
      }
      this.loading = true;
      this.contentService.createContent(formData).subscribe({
        next: (res) => {
          console.log('Content uploaded successfully:', res);
          this.loading = false;
          this.visible = false;
          this.reloadData();
        },
        error: (err) => {
          {
            console.error('Error uploading content:', err);
            this.loading = false;
          }
        },
      });
    }
  }

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
