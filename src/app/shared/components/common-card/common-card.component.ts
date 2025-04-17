import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-common-card',
  standalone: true,
  imports: [CommonModule, Menu, ButtonModule],
  templateUrl: './common-card.component.html',
  styleUrl: './common-card.component.scss',
})
export class CommonCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() icon = 'pi-info-circle';
  @Input() iconColor = 'text-blue-500';
  @Input() iconBgColor = 'bg-blue-100 dark:bg-blue-400/10';
  @Input() trendText = '';
  @Input() trendDescription = '';

  @Input() showMenu = false;
  @Input() menuItems: MenuItem[] = [];
  @Input() dimmed = false;
  @Input() active = false;
  @Output() menuAction = new EventEmitter<string>(); // Opcional si quieres manejarlo como un string
}
