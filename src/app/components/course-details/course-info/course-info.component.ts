import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, Users, Star } from 'lucide-angular';
import { DialogModule } from 'primeng/dialog';
import { RatingService } from '../../../Services/models/rating.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css'],
  standalone: true,
  imports: [NgFor, LucideAngularModule, NgClass, DialogModule],
})
export class CourseInfoComponent {
  readonly Users = Users;
  readonly Star = Star;
  displayDialog: boolean = false;
  stars: number[] = [1, 2, 3, 4, 5];
  rating: number = 0;
  @Input() courseInfo: any;
  @Input() userID: string;
  @Input() contentId: string;

  constructor(private ratingService: RatingService) {}

  getStarClass(index: number): string {
    return index < Math.floor(this.courseInfo.rating)
      ? 'text-yellow-400'
      : 'text-gray-300';
  }

  getStarClassModal(index: number): string {
    return index < this.rating ? 'text-yellow-400' : 'star-empty';
  }

  openDialog() {
    this.displayDialog = true;
  }

  setRating(value: number) {
    this.rating = value;
  }

  submitFeedback() {
    this.displayDialog = false;
    console.log(this.rating);

    this.ratingService
      .createRating({
        contentId: Number(this.contentId),
        userId: this.userID,
        ratingValue: this.rating,
      })
      .subscribe({
        next: (response) => console.log('rating: ', response),
        error: (err) => console.log('rating: ', err),
      });
    this.rating = 0;
  }
}
