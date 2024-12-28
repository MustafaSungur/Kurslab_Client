import { Component } from '@angular/core';
import { HomeNavbarComponent } from '../../../components/shared/header/home-navbar/home-navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [HomeNavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css',
})
export class HomeLayoutComponent {}
