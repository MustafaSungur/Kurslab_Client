import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { CommentService } from '../../../Services/models/comment.service';
import { ResourceUrlDirective } from '../../../directives/resource-url.directive';
import { AuthService } from '../../../Services/auth.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { CommentLikeService } from '../../../Services/models/comment-like.service';
import { HighlightLikeDirective } from '../../../directives/highlight-like.directive';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ButtonModule,
    AvatarModule,
    FormsModule,
    NgIf,
    NgFor,
    DatePipe,
    ResourceUrlDirective,
    ConfirmDialogComponent,
    HighlightLikeDirective,
  ],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css'],
})
export class CommentSectionComponent implements OnInit {
  customUserImage = '../../../../assets/defaultProfile.png';
  commentForm: FormGroup;
  @Input() courseID: number;
  currentUser: any;
  comments: any[] = [];
  editingCommentId: number | null = null;
  editedCommentText: string = '';

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private authService: AuthService,
    private commentLikeService: CommentLikeService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    });

    this.commentForm = this.fb.group({
      newComment: [''],
    });

    this.commentService.getCommentByContentId(this.courseID).subscribe({
      next: (response: any) => {
        this.comments = [...response.$values];
      },
      error: (err) => console.log(err.message),
    });
  }

  handleAddComment() {
    const newComment = this.commentForm.get('newComment')?.value.trim();
    let comment: any;
    if (newComment) {
      comment = {
        contentId: this.courseID,
        userId: this.currentUser.userID,
        description: newComment,
      };

      this.commentService.createComment(comment).subscribe({
        next: () => this.ngOnInit(),
        error: (err) => {
          this.ngOnInit();
          console.log(err);
        },
      });
      this.commentForm.reset();
    }
  }

  startEditingComment(comment: any) {
    this.editingCommentId = comment.id;
    this.editedCommentText = comment.description;
  }

  handleSaveEdit() {
    if (this.editingCommentId && this.editedCommentText.trim()) {
      const updatedComment = {
        description: this.editedCommentText.trim(),
        userId: this.currentUser.userID,
        contentId: Number(this.courseID),
      };

      console.log(this.editedCommentText.trim());
      this.commentService
        .updateComment(this.editingCommentId, updatedComment)
        .subscribe({
          next: (response) => {
            this.ngOnInit();
          },

          error: (error) => {
            console.error(
              'Yorum güncellenirken bir hata oluştu:',
              error.message
            );
          },
        });

      this.editingCommentId = null;
      this.editedCommentText = '';
    }
  }

  handleDeleteComment(id: number) {
    console.log('çalıştı: ', id);
    // this.commentService.deleteComment(id);
  }

  handleToggleLike(comment: any) {
    // Kullanıcının mevcut beğenisinin kontrolü
    const userLikeIndex = comment.likes.$values.findIndex(
      (like: any) => like.userId === this.currentUser.userID
    );

    const commentLike = {
      commentId: comment.id,
      userId: this.currentUser.userID,
    };

    if (userLikeIndex > -1) {
      const likeId = comment.likes.$values[userLikeIndex].id;
      this.commentLikeService.deleteCommentLike(likeId).subscribe({
        next: () => this.ngOnInit(),
        error: () => this.ngOnInit(),
      });
    } else {
      this.commentLikeService.createCommentLike(commentLike).subscribe({
        next: () => this.ngOnInit(),
        error: () => this.ngOnInit(),
      });
    }
  }
}
