import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {
  Activity,
  ActivityCategory,
  ActivityLanguage,
  ActivitySubcategoryBeach,
  ActivitySubcategoryWine,
} from '../models/activity';
import {
  Education,
  EducationTraining,
  EducationType,
  EducationUniversity,
} from '../models/education';
import { Profile, ProfileNationality } from '../models/profile';
import { User, UserType } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const activities: Activity[] = [
      {
        id: 1,
        name: 'Surfing',
        category: ActivityCategory.BEACH,
        subcategory: ActivitySubcategoryBeach.ACTIVITY,
        description:
          'Cras ultricies ligula sed magna dictum porta. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',
        language: ActivityLanguage.EN,
        price: 20,
        date: new Date(2020, 11, 28),
        peopleRegistered: 1,
        adminId: 2,
      },
      {
        id: 2,
        name: 'Snorkel',
        category: ActivityCategory.BEACH,
        subcategory: ActivitySubcategoryBeach.ACTIVITY,
        description:
          'Cras ultricies ligula sed magna dictum porta. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',
        language: ActivityLanguage.EN,
        price: 20,
        date: new Date(2020, 11, 28),
        peopleRegistered: 5,
        adminId: 2,
      },
      {
        id: 3,
        name: 'Drink',
        category: ActivityCategory.WINE,
        subcategory: ActivitySubcategoryWine.WINERY,
        description:
          'Cras ultricies ligula sed magna dictum porta. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',
        language: ActivityLanguage.EN,
        price: 10,
        date: new Date(2020, 11, 28),
        peopleRegistered: 1,
        adminId: 3,
      },
    ];
    const myActivities: { id: number; activityId: number; userId: number }[] = [
      {
        id: 1,
        activityId: 1,
        userId: 1,
      },
      {
        id: 2,
        activityId: 2,
        userId: 2,
      },
    ];
    const users: User[] = [
      {
        id: 1,
        type: UserType.TOURIST,
        email: 'a@a.es',
        password: 'asg',
      },
      {
        id: 2,
        type: UserType.COMPANY,
        email: 'b@b.es',
        password: 'asg',
      },
    ];
    const profiles: Profile[] = [
      {
        id: 1,
        firstName: 'anibal',
        lastName: 'santos',
        type: UserType.TOURIST,
        birthday: new Date(1989, 2, 7),
        phone: '645227483',
        nationality: ProfileNationality.ES,
        nif: '70873352W',
        about: 'Soy Anibal Santos, un turista',
      },
      {
        id: 2,
        firstName: 'anibal',
        lastName: 'santos',
        type: UserType.COMPANY,
        birthday: new Date(1989, 2, 7),
        phone: '645227483',
        nationality: ProfileNationality.ES,
        nif: '70873352W',
        about: 'Soy Anibal Santos, un empresario',
      },
    ];
    const education: Education[] = [
      {
        id: 1,
        userId: 1,
        name: 'Master Web',
        school: 'UOC',
        finishDate: new Date(2021, 12, 31),
        type: EducationType.UNIVERSITY,
        level: EducationUniversity.MASTER,
      },
      {
        id: 2,
        userId: 1,
        name: 'Law Degree',
        school: 'USAL',
        finishDate: new Date(2012, 12, 31),
        type: EducationType.UNIVERSITY,
        level: EducationUniversity.GRADUATE2,
      },
      {
        id: 3,
        userId: 2,
        name: 'Law Degree',
        school: 'USAL',
        finishDate: new Date(2012, 12, 31),
        type: EducationType.UNIVERSITY,
        level: EducationUniversity.GRADUATE2,
      },
      {
        id: 3451,
        userId: 1,
        name: 'DAM',
        school: 'Ilerna Online',
        finishDate: new Date(2021, 12, 31),
        type: EducationType.TRAINING,
        level: EducationTraining.HNC,
      },
    ];
    return { activities, myActivities, users, profiles, education };
  }
}
