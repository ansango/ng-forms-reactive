import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile, ProfileNationality } from 'src/app/shared/models/profile';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  profile?: Profile;
  profileForm!: FormGroup;
  nationalities = Object.values(ProfileNationality);
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.minLength(4),
          Validators.maxLength(55),
          Validators.pattern(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/),
        ],
      ],
      lastName: [
        '',
        [
          Validators.minLength(4),
          Validators.maxLength(55),
          Validators.pattern(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/),
        ],
      ],
      birthday: [''],
      phone: [0],
      nationality: [null, [Validators.required]],
      nif: [null, [Validators.required]],
      about: [null],
      companyName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.pattern(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/),
        ],
      ],
      companyDescription: [''],
      cif: ['', Validators.required],
    });
    this.getProfile();
  }

  getProfile(): void {
    const id = this.userService.getLocaleUser().id!;
    this.profileService.getProfile(id).subscribe((profile) => {
      this.profile = profile;
      this.profileForm.patchValue({
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthday: profile.birthday,
        phone: profile.phone,
        nationality: profile.nationality,
        nif: profile.nif,
        about: profile.about,
        companyName: profile.companyName,
        companyDescription: profile.companyDescription,
        cif: profile.cif,
      });
    });
  }

  onSubmit(form: FormGroup): void {}
}
