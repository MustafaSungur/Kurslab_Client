import {
  Directive,
  Input,
  HostBinding,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { environment } from '../../environments/environment';

@Directive({
  selector: '[appResourceUrl]',
  standalone: true,
})
export class ResourceUrlDirective implements OnInit, OnChanges {
  @Input('appResourceUrl') url: string | null = null;
  @Input() defaultUrl: string = '';

  @HostBinding('src') src!: string;

  ngOnInit(): void {
    this.updateSrc();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['url'] || changes['defaultUrl']) {
      this.updateSrc();
    }
  }

  private updateSrc(): void {
    this.src = this.url
      ? environment.baseURLFiles + this.url.replace(/\\/g, '/')
      : this.defaultUrl;
  }
}
