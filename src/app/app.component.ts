import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services';
import { MenuBarComponent } from './components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);

  ngOnInit() {
    this.authService.appUser$;
  }
}
