import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-all-task',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './list-all-tasks.component.html',
  styleUrl: './list-all-tasks.component.css',
})
export class ListAllTasksComponent implements OnInit {
  tasks!: any[];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toast: ToastrService
  ) {
    console.log('ListAllTasksComponent  constructor');
  }
  ngOnInit(): void {
    console.log('ListAllTasksComponent  ngOnInit');

    this.taskService.getTasks().subscribe(
      (res: any) => {
        const user = localStorage.getItem('user');
        if (res) {
          this.tasks = res;
        }
      },
      (err: any) => {
        console.log(err.error);
        alert('Unable to fetch tasks');
      }
    );
  }

  completeTask(id: any, task: any) {
    const completeTask = { ...task, status: 'COMPLETED' };
    this.taskService.updateTask(id, completeTask).subscribe(
      (res) => {
        console.log('Completed');
        this.toast.success('Task Completed');
        this.ngOnInit();
        // this.router.navigateByUrl('/tasks');
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(
      (res) => {
        this.toast.success('Task Deleted');
        this.ngOnInit();
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
