import { Component } from '@angular/core';

interface Student {
  id: number;
  name: string;
  grade: string;
}

@Component({
  selector: 'app-grade',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css']
})
export class GradingComponent {
  students: Student[] = [];
  newStudent: Student = {} as Student;
  editedStudent: Student = {} as Student;
  isEditing = false;
  searchKeyword = '';

  addStudent(): void {
  }

  editStudent(student: Student): void {
  }

  saveEditedStudent(): void {
  }

  cancelEdit(): void {
  }

  deleteStudent(student: Student): void {
  }

  get filteredStudents(): Student[] {
    return [];
  }
}
