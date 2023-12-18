import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GradingComponent } from './grading.component';

describe('GradingComponent', () => {
  let component: GradingComponent;
  let fixture: ComponentFixture<GradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradingComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have form fields for adding a student', () => {
      const compiled = fixture.nativeElement;
      const formFields = compiled.querySelectorAll('form input');
      expect(formFields.length).toBe(2); // Check for the number of input fields
    });

    it('should have a button for adding a student', () => {
      const compiled = fixture.nativeElement;
      const addButton = compiled.querySelector('form button[type="submit"]');
      expect(addButton.textContent).toContain('Add Student');
    });

    it('should display search input for filtering students', () => {
      const compiled = fixture.nativeElement;
      const searchInput = compiled.querySelector('div:nth-child(3) input[type="text"]');
      expect(searchInput).toBeTruthy();
    });

    it('should display edit student form when editing a student', () => {
      component.isEditing = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const editForm = compiled.querySelector('div:nth-child(5) form');
      expect(editForm).toBeTruthy();
      const saveButton = editForm.querySelector('button[type="submit"]');
      const cancelButton = editForm.querySelector('button[type="button"]');
      expect(saveButton.textContent).toContain('Save');
      expect(cancelButton.textContent).toContain('Cancel');
    });

    it('should add a student when submitting the add student form', () => {
      const addButton = fixture.nativeElement.querySelector('form button[type="submit"]');
      const inputFields = fixture.nativeElement.querySelectorAll('form input');
      const sampleStudent = {
        name: 'John Doe',
        grade: 'A',
      };

      inputFields[0].value = sampleStudent.name;
      inputFields[0].dispatchEvent(new Event('input'));
      inputFields[1].value = sampleStudent.grade;
      inputFields[1].dispatchEvent(new Event('input'));

      addButton.click();
      fixture.detectChanges();

      expect(component.students.length).toBe(1);
      expect(component.students[0]).toEqual({
        ...sampleStudent,
        id: 1,
      });
    });

    it('should have initial students array empty', () => {
      expect(component.students).not.toBeNull();
      expect(component.students).toEqual([]);
    });

    it('should add a new student', () => {
      component.newStudent = {
        id: 1,
        name: 'Jane Doe',
        grade: 'B',
      };
      component.addStudent();
      expect(component.students).not.toBeNull();
      expect(component.students.length).toBe(1);
    });

    it('should edit a student and update it', () => {
      component.newStudent = {
        id: 1,
        name: 'Alice',
        grade: 'A',
      };
      component.addStudent();

      component.editStudent(component.students[0]);
      const updatedStudent = {
        id: component.students[0].id,
        name: 'Bob',
        grade: 'B',
      };
      component.editedStudent = { ...updatedStudent };
      component.saveEditedStudent();
      expect(component.students).not.toBeNull();
      expect(component.students[0]).not.toBeNull();
      expect(component.students[0]).toEqual(updatedStudent);
    });

    it('should not edit a student with empty fields', () => {
      component.newStudent = {
        id: 1,
        name: 'Alice',
        grade: 'A',
      };
      component.addStudent();

      component.editStudent(component.students[0]);
      const originalStudent = { ...component.students[0] };
      component.newStudent = {
        id: originalStudent.id,
        name: '',
        grade: '',
      };
      component.saveEditedStudent();
      expect(component.students).not.toBeNull();
      expect(component.students[0]).not.toBeNull();
      expect(component.students[0]).toEqual(originalStudent);
    });

    it('should delete a student', () => {
      component.newStudent = {
        id: 1,
        name: 'Alice',
        grade: 'A',
      };
      component.addStudent();

      expect(component.students).not.toBeNull();
      expect(component.students.length).toBe(1);
      component.deleteStudent(component.students[0]);
      expect(component.students.length).toBe(0);
    });

    it('should cancel editing', () => {
      component.editStudent({
        id: 1,
        name: 'Alice',
        grade: 'A',
      });
      component.cancelEdit();
      expect(component.isEditing).toBe(false);
      expect(component.editedStudent).toEqual({});
    });

    it('should filter students based on search keyword', () => {
      component.newStudent = {
        id: 1,
        name: 'Alice',
        grade: 'A',
      };
      component.addStudent();

      component.searchKeyword = 'Alice';
      expect(component.filteredStudents.length).toBe(1);

      component.searchKeyword = 'Bob';
      expect(component.filteredStudents.length).toBe(0);
    });
  });
});
