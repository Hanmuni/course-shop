import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  student!: Observable<any>;

  name: string | undefined;
  course: string | undefined;
  date: string | undefined;
  price: number | undefined;
  password: string | undefined;

  studentForm: UntypedFormGroup | undefined;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private firestore: Firestore
  ) {
    this.getStudent();
  }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      course: ['', [Validators.required, Validators.minLength(1)]],
      date: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  submitStudent() {
    if (this.studentForm?.valid) {
      const collectionInstance = collection(this.firestore, 'students');
      addDoc(collectionInstance, this.studentForm?.value)
        .then(() => {
          console.log(
            'Student submitted successfully',
            this.studentForm?.value
          );
        })
        .catch((e) => {
          console.log(e);
        });
      this.studentForm?.reset();
    }
  }

  getStudent() {
    const collectionInstance = collection(this.firestore, 'students');
    collectionData(collectionInstance, { idField: 'id' }).subscribe((value) => {
      console.log(value);
    });
    this.student = collectionData(collectionInstance, { idField: 'id' });
  }

  editStudent(id: string) {
    const docInstance = doc(this.firestore, 'students', id);
    const editData = {
      name: ['', [Validators.required, Validators.minLength(3)]],
      course: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.minLength(1)]],
    };

    updateDoc(docInstance, editData)
      .then(() => {
        console.log('Edited!');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteStudent(id: string) {
    const docInstance = doc(this.firestore, 'students', id);
    deleteDoc(docInstance).then(() => {
      console.log('Deleted!');
    });
  }
}
