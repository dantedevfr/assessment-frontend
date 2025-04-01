import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './common-card.component.html',
  styleUrl: './common-card.component.scss'
})
export class CommonCardComponent {
  @Input() title!: string;
  @Input() value!: string;
  @Input() icon!: string;
  @Input() iconBgColor: string = 'bg-gray-200'; // default bg
  @Input() iconColor: string = 'text-gray-800'; // default icon color
  @Input() trendText!: string;
  @Input() trendDescription!: string;
}
