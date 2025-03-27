import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPrimeModule } from '../../../../shared/modules/shared-prime.module';

@Component({
  selector: 'app-courses-list-page',
  standalone: true,
  imports: [CommonModule,SharedPrimeModule],
  templateUrl: './courses-list-page.component.html',
  styleUrl: './courses-list-page.component.css'
})
export class CoursesListPageComponent {

}
