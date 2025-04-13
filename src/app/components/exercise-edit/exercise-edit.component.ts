import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Exercise, Question } from '@app/models';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { deepEqual } from '@app/utils';
import { ExcerciseService } from '@app/services';
import { take } from 'rxjs';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-exercise-edit',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './exercise-edit.component.html',
  styleUrl: './exercise-edit.component.scss',
})
export class ExerciseEditComponent implements OnInit {
  private exerciseService = inject(ExcerciseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  initialExercise: Exercise;

  exerciseId: string;
  form: FormGroup;

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  ngOnInit() {
    this.exerciseId = this.route.snapshot.paramMap.get('id');
    if (this.exerciseId) {
      this.exerciseService.get(this.exerciseId).subscribe((exercise) => {
        this.initialExercise = { ...exercise };
        delete this.initialExercise.id;
        this.createForm(exercise);
      });
    } else {
      this.initialExercise = {} as Exercise;
      this.createForm({} as Exercise);
    }
  }

  save() {
    const toSave = this.exerciseId ? { ...this.form.value, id: this.exerciseId } : { ...this.form.value };
    this.exerciseService
      .save(toSave)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['opgaven-overzicht']);
      });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestionGroup());
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  createQuestionGroup(question?: Question): FormGroup {
    return new FormGroup({
      description: new FormControl(question?.description || '', [Validators.required, Validators.minLength(3)]),
    });
  }

  private createForm(exercise: Exercise) {
    this.form = new FormGroup({
      title: new FormControl(exercise?.title, [Validators.required, Validators.maxLength(20)]),
      description: new FormControl(exercise?.description, [Validators.required, Validators.maxLength(100)]),
      points: new FormControl(exercise?.points || 1, [Validators.required, Validators.min(0), Validators.max(10)]),
      questions: new FormArray(
        exercise?.questions ? exercise.questions.map((question) => this.createQuestionGroup(question)) : []
      ),
    });
  }

  isFormChanged(): boolean {
    const formValue = { ...this.form.value };
    return !deepEqual(this.initialExercise, formValue);
  }

  generate() {
    loadFile('https://docxtemplater.com/tag-example.docx', function (error: Error | null, content: string) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      doc.render({
        first_name: 'John',
        last_name: 'Doe',
        phone: '0652455478',
        description: 'New Website',
      });
      const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      // Output the document using Data-URI
      saveAs(out, 'output.docx');
    });
  }
}
