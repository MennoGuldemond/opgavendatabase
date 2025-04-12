import { Component } from '@angular/core';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-menu-bar',
  imports: [UserMenuComponent],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})
export class MenuBarComponent {}
