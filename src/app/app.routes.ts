import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    { path: '', component: MainComponent, data: {viewType: 'default', view: 'default'} },
    { path: 'reyeets', component: MainComponent, data: {viewType: 'default', view: 'reyeets'} },
    { path: 'top', component: MainComponent, data: {viewType: 'top', view: 'top'} },
    { path: 'new', component: MainComponent, data: {viewType: 'default', view: 'new'} },
    { path: 'profile', component: MainComponent, data: {viewType: 'profile', view: 'profile'} },
    { path: 'profile/ry', component: MainComponent, data: {viewType: 'profile', view: 'profile'} },
    { path: 'profile/following', component: MainComponent, data: {viewType: 'profile', view: 'profile'} },
    { path: 'profile/followers', component: MainComponent, data: {viewType: 'profile', view: 'profile'} },
    { path: 'notifications', component: MainComponent, data: {viewType: 'notifications', view: 'notifications'} },
    { path: 'find', component: MainComponent, data: {viewType: 'find', view: 'find'} },
    { path: 'top/this-month', component: MainComponent, data: {viewType: 'top', view: 'top-this-month'} },
    { path: 'top/all-time', component: MainComponent, data: {viewType: 'top', view: 'top-all-time'} },
];
