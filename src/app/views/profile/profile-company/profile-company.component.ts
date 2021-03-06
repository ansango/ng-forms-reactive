import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Profile, ProfileNationality } from 'src/app/shared/models/profile';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css'],
})
export class ProfileCompanyComponent implements OnInit {
  profile?: Profile;
  profileForm!: FormGroup;
  nationalities = Object.values(ProfileNationality);
  selectedNatES?: boolean = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group(
      {
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
      },
      { validators: this.checkNIF }
    );
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

  selectNat(event: any): boolean {
    if (event.target.value === ProfileNationality)
      return (this.selectedNatES = true);
    return (this.selectedNatES = false);
  }

  checkNIF(group: FormGroup): ValidationErrors | null {
    const ES = group.get('nationality')?.value === 'es';
    const NIF = group.get('nif')?.value;
    const REG = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    if (ES === true && REG.test(NIF) === false) {
      return { errorNIF: true };
    } else {
      return null;
    }
  }

  onSubmit(form: FormGroup): void {
    this.profileService
      .updateProfile(form.value)
      .subscribe(() => this.router.navigate(['/profile']));
  }
}
