import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css',
})
export class TaskCreateComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if (this.taskForm.value.name) {
      this.taskService.addTask(this.taskForm.value).subscribe(
        (res: any) => {
          this.toastr.success('Task Added');
          console.log(res);
          this.router.navigateByUrl('/tasks');
        },
        (error: any) => {
          this.toastr.error('Task not added');
        }
      );
    }
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      status: ['PENDING'],
    });
  }

  get name() {
    return this.taskForm.controls['name'];
  }
}
