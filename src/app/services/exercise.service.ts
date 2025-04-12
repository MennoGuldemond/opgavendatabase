import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Exercise } from '@app/models';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcerciseService {
  firestore: Firestore = inject(Firestore);
  exerciseCollection: CollectionReference = collection(this.firestore, 'exercise');

  get(id: string): Observable<Exercise> {
    const docRef = doc(this.firestore, 'exercise', id);
    const docSnapshot = getDoc(docRef);
    return from(docSnapshot).pipe(map((doc) => (doc.exists() ? (doc.data() as Exercise) : null)));
  }

  getAll(): Observable<Exercise[]> {
    return collectionData(this.exerciseCollection, { idField: 'id' }) as Observable<Exercise[]>;
  }

  save(exercise: Exercise): Observable<void> {
    return exercise?.id
      ? from(setDoc(doc(this.firestore, 'exercise', exercise.id), exercise)) // Update existing exercise
      : from(addDoc(this.exerciseCollection, exercise)).pipe(map(() => undefined));
  }
}
