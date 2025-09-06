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
import { UserDataComponent } from './user_profile/user-data/user-data.component';
import { JustRegisteredComponent } from './just-registered/just-registered.component';

export const routes: Routes = [
    { path: '', component: MainViewComponent, data: {headerType: 'default'} },
    { path: 'reyeets', component: FollowingReyeetsViewComponent, data: {headerType: 'default'} },
    { path: 'top', component: TopViewComponent, data: {headerType: 'top', type: 'this-week'} },
    { path: 'new', component: NewViewComponent, data: {headerType: 'default'} },
    { path: 'profile', component: MyPostsViewComponent, data: {headerType: 'profile'} },
    { path: 'profile/ry', component: MyReyeetsViewComponent, data: {headerType: 'profile'} },
    { path: 'profile/following', component: MyFollowingViewComponent, data: {headerType: 'profile'} },
    { path: 'profile/followers', component: MyFollowersViewComponent, data: {headerType: 'profile'} },
    { path: 'notifications', component: NotificationsViewComponent, data: {headerType: 'notifications', tab: 'unread'} },
    { path: 'notifications/all', component: NotificationsViewComponent, data: {headerType: 'notifications', tab: 'all'} },
    { path: 'find', component: FindUsersViewComponent },
    { path: 'top/this-week', component: TopViewComponent, data: {headerType: 'top', type: 'this-week'} },
    { path: 'top/this-month', component: TopViewComponent, data: {headerType: 'top', type: 'this-month'} },
    { path: 'register', component: RegisterComponent },
    { path: 'user/:username', component: UserDataComponent, data: {tab: 'posts'} },
    { path: 'user/:username/ry', component: UserDataComponent, data: {tab: 'ry'} },
    { path: 'user/:username/following', component: UserDataComponent, data: {tab: 'following'} },
    { path: 'user/:username/followers', component: UserDataComponent, data: {tab: 'followers'} },
    { path: 'registered', component: JustRegisteredComponent},
];
