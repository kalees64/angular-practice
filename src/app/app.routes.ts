import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { ListAllTasksComponent } from './list-all-tasks/list-all-tasks.component';
import { roleGuardGuard } from './guards/role-guard.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'tasks',
    children: [
      { path: '', component: TaskListComponent },
      {
        path: 'create',
        component: TaskCreateComponent,
      },
      {
        path: 'all-tasks',
        component: ListAllTasksComponent,
        canActivate: [authGuard, roleGuardGuard],
      },
      {
        path: ':id',
        component: TaskViewComponent,
      },
      {
        path: ':id/edit',
        component: TaskEditComponent,
      },
    ],

    canActivate: [authGuard],
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
