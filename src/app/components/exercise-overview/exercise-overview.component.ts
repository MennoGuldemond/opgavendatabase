import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Exercise } from '@app/models';
import { ExcerciseService } from '@app/services';

@Component({
  selector: 'app-exercise-overview',
  imports: [MatTableModule, CommonModule, AsyncPipe, RouterModule, MatButtonModule],
  templateUrl: './exercise-overview.component.html',
  styleUrl: './exercise-overview.component.scss',
})
export class ExerciseOverviewComponent implements OnInit {
  private router = inject(Router);
  private exerciseServive = inject(ExcerciseService);

  exercises$: Observable<Exercise[]>;
  displayedColumns: string[] = ['title', 'points'];
  dataSource: MatTableDataSource<Exercise>;

  ngOnInit() {
    this.exercises$ = this.exerciseServive.getAll().pipe(
      map((exercises) => {
        this.dataSource = new MatTableDataSource(exercises);
        return exercises;
      })
    );
  }

  newExercise() {
    this.router.navigate(['opgaven-bewerken']);
  }

  openExercise(excercise: Exercise) {
    this.router.navigate([`opgaven-bewerken/${excercise.id}`]);
  }
}
