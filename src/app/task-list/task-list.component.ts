import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks!: any[];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toast: ToastrService,
    private userService: UserService
  ) {
    console.log('TaskListComponent  constructor');
  }
  ngOnInit(): void {
    console.log('TaskListComponent  ngOnInit');

    const userRole = this.userService.getUserRoleFromLocalStorage();

    if (userRole === 'ADMIN') {
      this.router.navigateByUrl('/tasks/all-tasks');
    }

    this.taskService.getTasks().subscribe(
      (res: any) => {
        const user = this.userService.getUserFromLocalStorage();
        console.log(user);
        if (res) {
          this.tasks = res.filter((val: any) => val.created_by == user);
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
