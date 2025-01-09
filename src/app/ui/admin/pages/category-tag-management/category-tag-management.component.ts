import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-category-tag-management',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './category-tag-management.component.html',
  styleUrl: './category-tag-management.component.css',
})
export class CategoryTagManagementComponent {}
