import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../../../counter/components/counter/counter.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-courses-list-page',
  standalone: true,
  imports: [CommonModule,CounterComponent,ButtonModule,CardModule],
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
