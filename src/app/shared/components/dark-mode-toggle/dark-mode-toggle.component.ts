import { Component } from '@angular/core';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  templateUrl: './dark-mode-toggle.component.html',
  styles: [`
    button {
      position: fixed;
      top: 1rem;
      right: 1rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      z-index: 1000;
      cursor: pointer;
    }
  `]
})
export class DarkModeToggleComponent {
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('my-app-dark');
    } else {
      body.classList.remove('my-app-dark');
    }
  }
}
