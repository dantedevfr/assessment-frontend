import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPrimeModule } from '../../../../shared/modules/shared-prime.module';
import { DarkModeToggleComponent } from '../../../../shared/components/dark-mode-toggle/dark-mode-toggle.component';

@Component({
  selector: 'app-courses-list-page',
  standalone: true,
  imports: [CommonModule,SharedPrimeModule,DarkModeToggleComponent],
  templateUrl: './courses-list-page.component.html',
  styleUrl: './courses-list-page.component.scss'
})
export class CoursesListPageComponent {
  text = '';

  msg = '';

  onClick() {
    this.msg = 'Welcome ' + this.text;
  }
}
