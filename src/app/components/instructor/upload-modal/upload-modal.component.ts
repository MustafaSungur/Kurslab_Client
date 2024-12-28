import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { CategoryService } from '../../../Services/models/category.service';
import { TagService } from '../../../Services/models/tag.service';
import { TransformDataService } from '../../../Services/transform-data.service';
import { ContentService } from '../../../Services/models/content.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-upload-modal',
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
    MultiSelectModule,
    TreeSelectModule,
  ],
  templateUrl: './upload-modal.component.html',
  styleUrl: './upload-modal.component.css',
})
export class UploadModalComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  user: any;
  courseForm: FormGroup;
  categories = [];
  tags = [];

  contentLoading: boolean = false;

  previewImageUrl: string | null = null;
  previewVideoUrl: string | null = null;
  selectedImage: File;
  selectedVideo: File;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private tagService: TagService,
    private contentService: ContentService,
    private transformDataService: TransformDataService,
    private authService: AuthService
  ) {
    authService.user$.subscribe((user) => {
      this.user = user;
    });

    categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        console.log(res);
        this.categories = transformDataService.transformData(res.$values);
      },
      error: (err) => console.log(err),
    });

    tagService.getAllTag().subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.$values) {
          this.tags = transformDataService.transformData(res.$values);
        } else {
          console.error('Invalid data structure:', res);
        }
      },
      error: (err) => console.log(err),
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
      ); // Convert number to string

      // Required TagIds (send as JSON array or individual fields)
      const tagIds =
        this.courseForm.get('tags')?.value?.map((tag: any) => tag.key) || [];
      tagIds.forEach((tagId: number) => {
        formData.append('TagIds', String(tagId)); // Append each tag ID
      });

      // Optional fields
      formData.append('VideoUrl', null); // Assuming you don't have a URL yet
      formData.append('ImageUrl', null); // Assuming you don't have a URL yet
      formData.append('Duration', null); // Optional, can be omitted or null

      // File uploads (optional)
      if (this.selectedImage) {
        formData.append('imageFile', this.selectedImage);
      }
      if (this.selectedVideo) {
        formData.append('videoFile', this.selectedVideo);
      }

      // Debugging the FormData structure
      for (const [key, value] of (formData as any).entries()) {
        console.log(`${key}:`, value);
      }

      // Send the request
      this.contentService.createContent(formData).subscribe({
        next: (res) => console.log('Content uploaded successfully:', res),
        error: (err) => console.error('Error uploading content:', err),
      });
    }
  }

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
