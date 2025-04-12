import { Routes } from '@angular/router';
import { ExerciseEditComponent, ExerciseOverviewComponent } from './components';

export const routes: Routes = [
  { path: 'opgaven-overzicht', title: 'Opgaven', component: ExerciseOverviewComponent },
  { path: 'opgaven-bewerken/:id', title: 'Bewerken', component: ExerciseEditComponent },
  { path: 'opgaven-bewerken', title: 'Bewerken', component: ExerciseEditComponent },
  { path: '', redirectTo: '/opgaven-overzicht', pathMatch: 'full' },
];
