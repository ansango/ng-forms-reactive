import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Education } from '../models/education';
import { Profile } from '../models/profile';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private readonly urlEducation = 'api/education';
  private readonly urlProfiles = 'api/profiles';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) {}

  postProfile(profile: Profile): void {
    this.http
      .post<Profile>(this.urlProfiles, profile, this.httpOptions)
      .subscribe();
  }

  getProfile(id: number): Observable<Profile> {
    const url = `${this.urlProfiles}/${id}`;
    return this.http.get<Profile>(url);
  }

  getEducation(): Observable<Education[]> {
    const url = `${this.urlEducation}`;
    return this.http.get<Education[]>(url);
  }

  getEducationById(id: number): Observable<Education> {
    if (id === 0) return of();
    const url = `${this.urlEducation}/${id}`;
    return this.http.get<Education>(url);
  }

  deleteEducation(education: Education): Observable<Education> {
    const id = education.id;
    const url = `${this.urlEducation}/${id}`;
    return this.http.delete<Education>(url, this.httpOptions).pipe(
      tap((_) => {
        console.log(`education with id: ${id} was deleted`);
      })
    );
  }
}
