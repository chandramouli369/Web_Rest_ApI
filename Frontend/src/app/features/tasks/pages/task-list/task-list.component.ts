import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../models/task.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'dueDate', 'priority', 'status', 'actions'];
  sortBy: string = 'dueDate';
  sortDesc: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }
//Task3: Adding Sort Functionality by dates
  loadTasks(): void {
    this.taskService.getTasks({
      sortBy: this.sortBy,
      desc: this.sortDesc
    }).subscribe(response => {
      this.tasks = response;
    });
  }

  toggleSort(column: string): void {
    if (this.sortBy === column) {
      this.sortDesc = !this.sortDesc;
    } else {
      this.sortBy = column;
      this.sortDesc = false;
    }
    this.loadTasks();
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }
}
