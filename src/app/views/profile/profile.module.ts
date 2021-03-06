import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { EducationComponent } from './education/education.component';
import { ModalModule } from 'src/app/shared/components/modal';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { EducationNewEditComponent } from './education-new-edit/education-new-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
    EducationComponent,
    ProfileEditComponent,
    EducationNewEditComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ModalModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
