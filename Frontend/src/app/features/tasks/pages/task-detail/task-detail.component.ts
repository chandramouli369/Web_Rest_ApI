// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// // import { CommonModule } from '@angular/common';
// // import { TaskService } from '../../../../services/task.service';
// // import { Task } from '../../../../models/task.model';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatCardModule } from '@angular/material/card';

// @Component({
//   selector: 'app-task-detail',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     MatButtonModule,
//     RouterModule // ✅ Important: for routerLink to work
//   ],
//   templateUrl: './task-detail.component.html',
//   styleUrls: ['./task-detail.component.scss']
// })
// export class TaskDetailComponent implements OnInit {
//   task: Task | null = null;
//   loading = true;
//   error = false;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private taskService: TaskService
//   ) {}

//   ngOnInit(): void {
//     const idParam = this.route.snapshot.paramMap.get('id');
//     const id = idParam ? Number(idParam) : null;

//     if (id) {
//       this.taskService.getTask(id).subscribe({
//         next: (task) => {
//           this.task = task;
//           this.loading = false;
//         },
//         error: () => {
//           this.error = true;
//           this.loading = false;
//         }
//       });
//     } else {
//       this.error = true;
//       this.loading = false;
//     }
//   }

//   goBack(): void {
//     this.router.navigate(['/tasks']);
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { TaskService } from '../../../../services/task.service';
// import { Task } from '../../../../models/task.model';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';

// @Component({
//   selector: 'app-task-detail',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     MatButtonModule,
//     RouterModule,
//     FormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule
//   ],
//   templateUrl: './task-detail.component.html',
//   styleUrls: ['./task-detail.component.scss']
// })
// export class TaskDetailComponent implements OnInit {
//   task: Task | null = null;
//   editedTask: Task = {} as Task;
//   loading = true;
//   error = false;
//   editMode = false;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private taskService: TaskService
//   ) {}

//   ngOnInit(): void {
//     const idParam = this.route.snapshot.paramMap.get('id');
//     const id = idParam ? Number(idParam) : null;

//     if (id) {
//       this.taskService.getTask(id).subscribe({
//         next: (task) => {
//           this.task = task;
//           this.loading = false;
//         },
//         error: () => {
//           this.error = true;
//           this.loading = false;
//         }
//       });
//     } else {
//       this.error = true;
//       this.loading = false;
//     }
//   }

//   goBack(): void {
//     this.router.navigate(['/tasks']);
//   }

//   enableEdit(): void {
//     if (this.task) {
//       this.editMode = true;
//       this.editedTask = { ...this.task }; // Clone task to allow safe editing
//     }
//   }

//   cancelEdit(): void {
//     this.editMode = false;
//   }

//   saveTask(): void {
//     if (!this.task || this.task.id === undefined) return;

//     this.taskService.updateTask(this.task.id, this.editedTask).subscribe({
//       next: (updatedTask) => {
//         this.task = updatedTask;
//         this.editMode = false;
//       },
//       error: () => {
//         alert('Failed to update task.');
//       }
//     });
//   }
// }
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
//Added Edit option
export class TaskDetailComponent implements OnInit, OnDestroy {
  task: Task | null = null;
  editedTask: Task = {} as Task;
  loading = true;
  error = false;
  editMode = false;

  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    // ✅ Subscribe to paramMap for dynamic route changes
    this.routeSub = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = idParam ? +idParam : null;

      if (id) {
        this.fetchTask(id);
      } else {
        console.log("HHHHHs")
        this.loading = false;
        this.error = true;
      }
    });
  }
  
  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = idParam ? Number(idParam) : null;

      if (id) {
        this.fetchTask(id);
      } else {
        this.loading = false;
        this.error = true;
      }
    });
  }

  // private fetchTask(id: number): void {
  //   this.loading = true;
  //   this.error = false;

  //   this.taskService.getTask(id).subscribe({
  //     next: (task) => {
  //       this.task = task;
  //       this.loading = false;
  //     },
  //     error: () => {
  //       this.error = true;
  //       this.loading = false;
  //     }
  //   });
  // }

  private fetchTask(id: number): void {
    this.loading = true;
    this.error = false;
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.task = task;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }

  enableEdit(): void {
    if (this.task) {
      this.editMode = true;
      this.editedTask = { ...this.task };
    }
  }

  cancelEdit(): void {
    this.editMode = false;
  }

  saveTask(): void {
    if (!this.task || this.task.id === undefined) return;
    console.log("Saevevevev")
    console.log(this.task)
    this.taskService.updateTask(this.task.id, this.editedTask).subscribe({
      next: (updatedTask) => {
        this.task = updatedTask;
        this.editMode = false;
      },
      error: () => {
        alert('Failed to update task.');
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}

