import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from 'src/interceptors/auth.guard';
import { MonitorComponent } from './monitor/monitor.component';
import { SupportComponent } from './support/support.component';
import { SystemComponent } from './admin/system/system.component';
import { UserComponent } from './admin/user/user.component';
import { AutomationComponent } from './automation/automation.component';
import { LicensesComponent } from './license/license.component';
import { UserEditComponent } from './admin/user/edit/user-edit.component';
import { AutomationEditComponent } from './automation/edit/automation-edit.component';
import { LicenseEditComponent } from './license/edit/license-edit.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'monitor', component: MonitorComponent, canActivate: [authGuard]},
    { path: 'support', component: SupportComponent, canActivate: [authGuard]},
    { path: 'automation', component: AutomationComponent, canActivate: [authGuard]},
    { path: 'automation/edit', component: AutomationEditComponent, canActivate: [authGuard]},
    { path: 'license', component: LicensesComponent, canActivate: [authGuard]},
    { path: 'license/edit', component: LicenseEditComponent, canActivate: [authGuard]},
    { path: 'admin', 
        canActivate: [authGuard], 
        children:[
            {path: 'system', component: SystemComponent, canActivate: [authGuard]},
            {path: 'user', component: UserComponent, canActivate: [authGuard]},
            {path: 'user/edit', component: UserEditComponent, canActivate: [authGuard]}
        ]},
    { path: '**', redirectTo:'monitor'}
];
