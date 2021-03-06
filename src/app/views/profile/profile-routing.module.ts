import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationNewEditComponent } from './education-new-edit/education-new-edit.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'edit', component: ProfileEditComponent },
  { path: 'new-edu', component: EducationNewEditComponent },
  { path: 'edit-edu/:id', component: EducationNewEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
