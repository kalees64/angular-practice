import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
})
export class TaskViewComponent implements OnInit {
  task!: any;
  id!: string;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadTask();
  }

  loadTask() {
    this.taskService.getTasksById(this.id).subscribe((res: any) => {
      this.task = res;
    });
  }
}
