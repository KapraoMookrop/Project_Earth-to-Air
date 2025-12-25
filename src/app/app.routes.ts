import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Analytics } from './pages/analytics/analytics';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'analytics', component: Analytics },
    { path: 'settings', component: Settings },
];