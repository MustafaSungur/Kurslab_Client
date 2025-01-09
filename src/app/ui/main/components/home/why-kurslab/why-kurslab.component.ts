import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-why-kurslab',
  standalone: true,
  imports: [NgFor, CommonModule, CardModule],
  templateUrl: './why-kurslab.component.html',
  styleUrl: './why-kurslab.component.css',
})
export class WhyKurslabComponent {
  features = [
    {
      title: 'Geniş Eğitim Yelpazesi',
      description:
        'Teknolojiden sanata, işletmeden dillere kadar her alanda eğitimler',
    },
    {
      title: 'Uzman Eğitmenler',
      description: 'Alanında uzman eğitmenlerle kaliteli eğitim',
    },
    {
      title: 'Esnek Öğrenme',
      description: 'Kendi hızınızda, istediğiniz zaman ve yerde öğrenin',
    },
    {
      title: 'İnteraktif İçerik',
      description: 'Videolar, quizler ve projelerle etkileşimli öğrenme',
    },
    {
      title: 'Sertifikalar',
      description: 'Tamamladığınız eğtimlerler için sertifikalar kazanın',
    },
    {
      title: 'Topluluk Desteği',
      description: 'Diğer öğrencilerle etkileşime geçin ve birlikte öğrenin',
    },
  ];
}
