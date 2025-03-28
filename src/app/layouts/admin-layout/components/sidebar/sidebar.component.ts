import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { SharedPrimeModule } from '../../../../shared/modules/shared-prime.module';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports: [SharedPrimeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  @Output() sidebarClosed = new EventEmitter<void>();
  @Input() sidebarVisible: boolean = true;


 // sidebarVisible: boolean = true;

    closeCallback(e:any): void {
        this.sidebarRef.close(e);
        this.sidebarClosed.emit();

    }

    openSidebar():void{
      this.sidebarVisible = true;
    }

}
