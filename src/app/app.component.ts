import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ThemeService } from './core/services/theme.service';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'assessment-frontend';
  //constructor(private primeng: PrimeNG) {}
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
   // this.primeng.ripple.set(true);
   this.themeService.loadSettingsFromLocalStorage();

}
}
