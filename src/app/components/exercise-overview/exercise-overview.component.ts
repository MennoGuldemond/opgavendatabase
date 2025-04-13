import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Exercise } from '@app/models';
import { ExcerciseService, GoogleDriveService } from '@app/services';
import { replacePlaceholdersAndDownload } from '@app/utils';

@Component({
  selector: 'app-exercise-overview',
  imports: [MatTableModule, CommonModule, AsyncPipe, RouterModule, MatButtonModule],
  templateUrl: './exercise-overview.component.html',
  styleUrl: './exercise-overview.component.scss',
})
export class ExerciseOverviewComponent implements OnInit {
  private router = inject(Router);
  // private exerciseServive = inject(ExcerciseService);
  private driveService = inject(GoogleDriveService);

  files: any[];
  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<any>;

  async ngOnInit() {
    await this.loadDocxFiles();
  }

  async loadDocxFiles() {
    await this.driveService.trySilentLogin();
    this.files = await this.driveService.listDocxFiles();
    this.dataSource = new MatTableDataSource(this.files);
    // console.log(this.files);
  }

  async generateFile(row: any) {
    const content = await this.driveService.downloadDocxFile(row.id);

    const placeholderData = {
      date: new Date().toLocaleDateString(),
    };

    replacePlaceholdersAndDownload(content, placeholderData, `Generated - ${row.name}`);
  }

  newExercise() {
    this.router.navigate(['opgaven-bewerken']);
  }

  openExercise(excercise: Exercise) {
    this.router.navigate([`opgaven-bewerken/${excercise.id}`]);
  }
}
