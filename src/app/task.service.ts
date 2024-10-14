import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private userService: UserService) {}

  getTasks() {
    const url = `${this.serverUrl}/tasks`;
    return this.http.get(url);
  }

  getTasksById(id: any) {
    const url = `${this.serverUrl}/tasks/${id}`;
    return this.http.get(url);
  }

  addTask(task: any) {
    const user = this.userService.getUserFromLocalStorage();
    const url = `${this.serverUrl}/tasks`;
    const newData = { ...task, created_by: user };
    return this.http.post(url, newData);
  }

  updateTask(id: any, task: any) {
    const url = `${this.serverUrl}/tasks/${id}`;
    return this.http.put(url, task);
  }

  deleteTask(id: any) {
    const url = `${this.serverUrl}/tasks/${id}`;
    return this.http.delete(url);
  }
}
