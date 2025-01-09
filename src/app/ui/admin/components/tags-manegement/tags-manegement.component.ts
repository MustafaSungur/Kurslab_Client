import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NgIf } from '@angular/common';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { TagService } from '../../../../core/Services/models/tag.service';

@Component({
  selector: 'app-tags-manegement',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    NgIf,
    LucideAngularModule,
  ],
  templateUrl: './tags-manegement.component.html',
  styleUrl: './tags-manegement.component.css',
})
export class TagsManegementComponent implements OnInit {
  createIcon = Plus;
  tags: any = [];
  searchTag = new FormControl('');
  IsDialogOpen = false;
  selectedTag: any;
  newTag = new FormControl('');

  constructor(private tagServive: TagService) {}

  ngOnInit(): void {
    this.tagServive.getAllTag().subscribe({
      next: (res: any) => {
        this.tags = [...res.$values];
      },
    });
  }

  get getTags() {
    return (
      this.tags.filter((tag: any) =>
        tag.name.toLowerCase().includes(this.searchTag.value.toLowerCase())
      ) || []
    );
  }

  editOrCreateTag(): void {
    if (this.selectedTag) {
      this.tagServive
        .updateTag(this.selectedTag.id, { name: this.newTag.value })
        .subscribe({
          next: (res) => {
            console.log(res);
            this.clear();

            this.ngOnInit();
          },
          error: (err) => {
            console.log(err);
            this.clear();
          },
        });
    } else {
      this.tagServive.createTag({ name: this.newTag.value }).subscribe({
        next: (res) => {
          this.clear();
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
          this.clear();
        },
      });
    }
  }

  deleteTag(tag: any): void {
    if (confirm(`Are you sure you want to delete category: ${tag.name}?`)) {
      this.tagServive.deleteTag(tag.id).subscribe({
        next: (res) => {
          this.clear();
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
          this.clear();
          this.ngOnInit();
        },
      });
    }
  }

  toggleModal(tag?: any) {
    if (tag) {
      this.selectedTag = tag;
      this.newTag.setValue(tag.name);
    }
    this.IsDialogOpen = !this.IsDialogOpen;
  }

  clear() {
    this.IsDialogOpen = false;
    this.selectedTag = null;
    this.newTag.setValue('');
    this.searchTag.setValue('');
  }
}
