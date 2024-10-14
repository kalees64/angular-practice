import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
})
export class TaskEditComponent implements OnInit {
  task!: any;
  id!: string;

  taskForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.taskForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.loadTask();
  }

  loadTask() {
    this.taskService.getTasksById(this.id).subscribe((res: any) => {
      this.task = res;
      this.taskForm.patchValue(res);
    });
  }

  onSubmit() {
    this.taskService.updateTask(this.id, this.taskForm.value).subscribe(
      (res) => {
        console.log('Updated');
        this.toast.success('Task Updated');
        this.router.navigateByUrl('/tasks');
      },
      (error) => {
        console.log(error);
        this.router.navigateByUrl('/tasks');
      }
    );
  }

  get name() {
    return this.taskForm.controls['name'];
  }
}
