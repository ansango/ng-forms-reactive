import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Education,
  EducationTraining,
  EducationType,
  EducationUniversity,
} from 'src/app/shared/models/education';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-education-new-edit',
  templateUrl: './education-new-edit.component.html',
  styleUrls: ['./education-new-edit.component.css'],
})
export class EducationNewEditComponent implements OnInit {
  education?: Education;
  newEducation?: Education;
  newEducationForm!: FormGroup;
  types = Object.values(EducationType);
  university = Object.values(EducationUniversity);
  training = Object.values(EducationTraining);
  selectedType: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.newEducationForm = this.formBuilder.group({
      type: [],
      level: [],
      name: [],
      school: [],
      finishDate: [],
    });
    this.getEducation();
  }

  selectType(event: any) {
    if (event.target.value.includes(EducationType.TRAINING))
      return (this.selectedType = 'training');
    return (this.selectedType = 'university');
  }

  getEducation(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.profileService.getEducationById(id).subscribe((education) => {
      this.education = education;
      this.newEducationForm.patchValue({
        type: education.type,
        level: education.level,
        name: education.name,
        school: education.school,
        finisDate: education.finishDate,
      });
    });
  }

  onSubmit(form: FormGroup) {
    const education = form.value;
  }
}
