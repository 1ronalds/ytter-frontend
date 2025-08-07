import { Routes } from '@angular/router';
import { MainViewComponent } from '../../views/main-view/main-view.component';
import { FollowingReyeetsViewComponent } from '../../views/following-reyeets-view/following-reyeets-view.component';
import { TopViewComponent } from '../../views/top-view/top-view.component';
import { NewViewComponent } from '../../views/new-view/new-view.component';
import { MyPostsViewComponent } from '../../views/my-posts-view/my-posts-view.component';
import { MyReyeetsViewComponent } from '../../views/my-reyeets-view/my-reyeets-view.component';
import { MyFollowingViewComponent } from '../../views/my-following-view/my-following-view.component';
import { MyFollowersViewComponent } from '../../views/my-followers-view/my-followers-view.component';
import { NotificationsViewComponent } from '../../views/notifications-view/notifications-view.component';
import { FindUsersViewComponent } from '../../views/find-users-view/find-users-view.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: MainViewComponent, data: {headerType: 'default'} },
    { path: 'reyeets', component: FollowingReyeetsViewComponent, data: {headerType: 'default'} },
    { path: 'top', component: TopViewComponent, data: {headerType: 'top', type: 'this-week'} },
    { path: 'new', component: NewViewComponent, data: {headerType: 'default'} },
    { path: 'profile', component: MyPostsViewComponent, data: {headerType: 'profile'} },
    { path: 'profile/ry', component: MyReyeetsViewComponent, data: {headerType: 'profile'} },
    { path: 'profile/following', component: MyFollowingViewComponent, data: {headerType: 'profile'} },
    { path: 'profile/followers', component: MyFollowersViewComponent, data: {headerType: 'profile'} },
    { path: 'notifications', component: NotificationsViewComponent, data: {headerType: 'notifications'} },
    { path: 'find', component: FindUsersViewComponent },
    { path: 'top/this-month', component: TopViewComponent, data: {headerType: 'top', type: 'this-month'} },
    { path: 'top/all-time', component: TopViewComponent, data: {headerType: 'top', type: 'all-time'} },
    { path: 'register', component: RegisterComponent }
];
