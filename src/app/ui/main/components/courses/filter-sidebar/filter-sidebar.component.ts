import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TreeSelectModule } from 'primeng/treeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { CategoryService } from '../../../../../core/Services/models/category.service';
import { TransformDataService } from '../../../../../core/Services/transform-data.service';
import { TagService } from '../../../../../core/Services/models/tag.service';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TreeSelectModule,
    CheckboxModule,
    FormsModule,
  ],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FilterSidebarComponent implements OnInit {
  public get categoryService(): CategoryService {
    return this._categoryService;
  }
  public set categoryService(value: CategoryService) {
    this._categoryService = value;
  }
  filterForm!: FormGroup;

  @Output() filtersChanged = new EventEmitter<any>();

  loading: boolean;
  error: string;
  categories: any[];
  transformedCategories: any;
  tags: any[];

  constructor(
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private tagService: TagService,
    private transformDataService: TransformDataService
  ) {}
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      searchTerm: '',
      category: [null],
      searchTag: '',
      tags: [[]],
      pageNumber: [1],
      pageSize: [10],
    });

    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.loading = false;
        this.categories = [...response.$values];
        this.transformedCategories = this.transformDataService.transformData(
          this.categories
        );
      },
      error: (err) => {
        console.log('Error: ', err);
        this.loading = false;
        this.error = err.message;
      },
    });

    this.tagService.getAllTag().subscribe({
      next: (response) => {
        this.loading = false;
        this.tags = [...response.$values];
      },
      error: (err) => {
        console.log('Error: ', err);
        this.loading = false;
        this.error = err.message;
      },
    });
  }
  onApplyFilters() {
    const filters = {
      categoryId: this.filterForm.get('category').value
        ? this.filterForm.get('category').value.key
        : null,
      searchTerm: this.filterForm.get('searchTerm').value,
      tagIds: [...this.filterForm.get('tags').value],
    };
    this.filtersChanged.emit(filters);
  }

  onResetFilters() {
    this.filterForm.reset({
      searchTerm: '',
      category: null,
      tags: [],
    });

    this.filtersChanged.emit(this.filterForm.value);
    this.tags = this.tags.map((tag) => ({
      ...tag,
      selected: false,
    }));
  }

  toggleTag(tagId: number) {
    const tagsControl = this.filterForm.get('tags');
    const currentTags: number[] = tagsControl?.value || [];
    if (currentTags.includes(tagId)) {
      tagsControl?.setValue(currentTags.filter((id) => id !== tagId));
    } else {
      tagsControl?.setValue([...currentTags, tagId]);
    }
  }

  get filteredTags() {
    const searchTag =
      this.filterForm.get('searchTag')?.value?.toLowerCase() || '';
    return this.tags
      ? this.tags.filter((tag) => tag.name.toLowerCase().includes(searchTag))
      : [];
  }
}
