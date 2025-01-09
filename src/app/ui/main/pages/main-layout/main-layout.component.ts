import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { HomeNavbarComponent } from '../../../shared/components/header/home-navbar/home-navbar.component';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [HomeNavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {}
