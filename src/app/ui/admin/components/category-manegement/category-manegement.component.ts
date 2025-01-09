import { Component, OnInit } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { JsonPipe, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { DialogModule } from 'primeng/dialog';
import { TreeSelectModule } from 'primeng/treeselect';
import { CategoryService } from '../../../../core/Services/models/category.service';
import { TransformDataService } from '../../../../core/Services/transform-data.service';

@Component({
  selector: 'app-category-manegement',
  standalone: true,
  imports: [
    TreeTableModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule,
    NgIf,
    DialogModule,
    TreeSelectModule,
  ],
  templateUrl: './category-manegement.component.html',
  styleUrl: './category-manegement.component.css',
})
export class CategoryManegementComponent implements OnInit {
  createIcon = Plus;
  categories: any;
  parentCategory = new FormControl('');
  newCategory = new FormControl('');
  IsDialogOpen = false;
  selectedCategory: any;
  serachCategory = new FormControl('');

  constructor(
    private categoryService: CategoryService,
    private transformDataService: TransformDataService
  ) {}
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = this.transformDataService.transformData(res.$values);
        console.log(this.categories);
      },
    });
  }

  get getCategory() {
    return (
      this.categories?.filter((category: any) =>
        category.label
          .toLowerCase()
          .includes(this.serachCategory.value.toLowerCase())
      ) || []
    );
  }

  editOrCreateCategory(): void {
    if (this.selectedCategory) {
      this.categoryService
        .updateCategory(this.selectedCategory.node.key, {
          name: this.newCategory.value,
          parentId: (this.parentCategory.value as any).key,
        })
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
      this.categoryService
        .createCategory({
          name: this.newCategory.value,
          parentId: (this.parentCategory.value as any).key,
        })
        .subscribe({
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

  deleteCategory(category: any): void {
    if (
      confirm(
        `Are you sure you want to delete category: ${category.node.label}?`
      )
    ) {
      this.categoryService.deleteCategory(category.node.key).subscribe({
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

  toggleModal(category?: any) {
    console.log(category);
    if (category) {
      this.selectedCategory = category;
      this.newCategory.setValue(category.node.label);
    }
    this.IsDialogOpen = !this.IsDialogOpen;
  }

  clear() {
    this.IsDialogOpen = false;
    this.selectedCategory = null;
    this.newCategory.setValue('');
    this.serachCategory.setValue('');
  }
}
