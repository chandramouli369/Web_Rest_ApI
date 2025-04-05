
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  taskId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [null, [Validators.required, this.futureDateValidator]],
      priority: ['Medium', Validators.required],
      status: ['Pending', Validators.required]
    });

    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.taskId;

    if (this.isEditMode && this.taskId) {
      this.taskService.getTask(this.taskId).subscribe(task => {
        this.taskForm.patchValue(task);
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const data = this.taskForm.value;

    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(this.taskId, data).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.createTask(data).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
  // ### Additional Features (Tasks 7-8)
  // 7. **Task 7**: Implement proper error handling and loading states:
  //    - Add error interceptors for API calls
  //    - Implement loading spinners
  //    - Add error messages and notifications
  //    - Handle offline scenarios
  
  // 8. **Task 8**: Add form validation and user experience improvements:
  //    - Implement reactive form validation
  //    - Add date validation for due dates
  //    - Show validation error messages
  //    - Add confirmation dialogs for destructive actions
  // ✅ Custom date validator
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return inputDate < today ? { pastDate: true } : null;
  }
}
