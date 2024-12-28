import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightLike]',
  standalone: true,
})
export class HighlightLikeDirective implements OnInit {
  @Input('appHighlightLike') commentLikes!: any[];
  @Input() currentUserId!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const userLiked = this.commentLikes?.some(
      (like) => like.userId === this.currentUserId
    );

    if (userLiked) {
      this.renderer.addClass(this.el.nativeElement, 'text-amber-500');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'text-gray-500');
    }
  }
}
