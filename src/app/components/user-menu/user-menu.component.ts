import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AppUser } from '@app/models';
import { AuthService } from '@app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user$: Observable<AppUser>;

  currentTheme$: Observable<string>;

  ngOnInit() {
    this.user$ = this.authService.appUser$;
  }

  login() {
    this.authService.googleSignin().subscribe();
  }

  logout() {
    this.authService.signOut().subscribe();
  }

  // navigateToCardsOverview() {
  //   this.router.navigate(['cards-overview']);
  // }
}
