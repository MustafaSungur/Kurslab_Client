import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeSelectModule } from 'primeng/treeselect';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ResourceUrlDirective } from '../../../../core/directives/resource-url.directive';
import { ContentService } from '../../../../core/Services/models/content.service';
import { AuthService } from '../../../../core/Services/auth.service';

@Component({
  selector: 'app-update-moda',
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
    ResourceUrlDirective,
    ProgressSpinnerModule,
  ],
  templateUrl: './update-moda.component.html',
  styleUrl: './update-moda.component.css',
})
export class UpdateModaComponent {
  @Input() course: any;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  user: any;
  courseForm: FormGroup;
  @Input() categories = [];
  @Input() tags = [];
  loading = false;
  previewImageUrl: string | null = null;
  selectedImage: File;

  constructor(
    private fb: FormBuilder,
    private contentService: ContentService,
    private router: Router,
    private authService: AuthService
  ) {
    authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      category: [null, Validators.required],
      tags: [[], Validators.required],
    });
  }

  ngOnChanges() {
    if (this.course) {
      this.patchCourseData();
    }
  }

  patchCourseData() {
    // Kategori arama
    const category = this.findCategoryById(
      this.categories,
      this.course.category.id
    );
    // Etiket eşleşmesi
    const selectedTags = this.tags?.filter((tag: any) =>
      this.course.contentTags.$values.some(
        (tagValue: any) => tagValue.tagId == tag.key
      )
    );

    // Formu doldur
    this.courseForm.patchValue({
      title: this.course.title || '',
      description: this.course.description || '',
      category: category || null,
      tags: selectedTags,
    });

    // Resim önizlemesi
    this.previewImageUrl = this.course.imageUrl || null;
  }

  findCategoryById(categories: any[], id: string): any {
    for (const category of categories) {
      if (category.key == id) {
        return category;
      }
      if (category.children) {
        const found = this.findCategoryById(category.children, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  handleTagChange(event: any) {
    const selected = event.value;
    if (selected.length > 3) {
      this.courseForm.controls['tags'].setValue(selected.slice(0, 3));
    }
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
        formData.append('TagIds', String(tagId));
      });

      if (this.selectedImage) {
        formData.append('imageFile', this.selectedImage);
      }

      this.loading = true;
      this.contentService.updateContent(this.course.id, formData).subscribe({
        next: (res) => {
          console.log('Content uploaded successfully:', res);
          this.visible = false;
          this.visibleChange.emit(this.visible);
          this.loading = false;
          window.location.reload();
        },
        error: (err) => {
          console.error('Error uploading content:', err);
          this.loading = false;
        },
      });
    }
  }

  onDelete() {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.loading = true;
      this.contentService.deleteContent(this.course.id).subscribe({
        next: (res) => {
          this.visible = false;
          this.visibleChange.emit(this.visible);
          this.loading = false;
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        },
      });
    }
  }

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
