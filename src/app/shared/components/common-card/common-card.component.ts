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
  @Input() title = '';
  @Input() value = '';
  @Input() icon = 'pi-info-circle';
  @Input() iconColor = 'text-blue-500';
  @Input() iconBgColor = 'bg-blue-100 dark:bg-blue-400/10';
  @Input() trendText = '';
  @Input() trendDescription = '';
}
