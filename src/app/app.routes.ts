import { Routes } from '@angular/router';
import { EditorComponent, ExerciseEditComponent, ExerciseOverviewComponent } from './components';

export const routes: Routes = [
  { path: 'opgaven-overzicht', title: 'Opgaven', component: ExerciseOverviewComponent },
  { path: 'opgaven-bewerken/:id', title: 'Bewerken', component: ExerciseEditComponent },
  { path: 'opgaven-bewerken', title: 'Bewerken', component: ExerciseEditComponent },
  { path: 'bewerken', title: 'Bewerken', component: EditorComponent },
  { path: '', redirectTo: '/bewerken', pathMatch: 'full' },
];
