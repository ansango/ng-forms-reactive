import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Activity } from '../models/activity';
import { UserType } from '../models/user';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private urlActivities = 'api/activities';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.urlActivities);
  }

  getActivity(id: number): Observable<Activity> {
    const url = `${this.urlActivities}/${id}`;
    return this.http.get<Activity>(url);
  }

  postActivity(activity: Activity): Observable<Activity> {
    if (
      !this.userService.isUserLogged() ||
      this.userService.getLocaleUser().type == UserType.TOURIST
    )
      return throwError(403);

    activity.adminId = this.userService.getLocaleUser().id!;
    return this.http.post<Activity>(
      this.urlActivities,
      activity,
      this.httpOptions
    );
  }

  updateActivity(activity: Activity): Observable<any> {
    activity.adminId = this.userService.getLocaleUser().id!;
    return this.http.put(this.urlActivities, activity, this.httpOptions);
  }

  deleteActivity(activity: Activity | number): Observable<Activity> {
    const id = typeof activity === 'number' ? activity : activity.id;
    const url = `${this.urlActivities}/${id}`;
    return this.http.delete<Activity>(url, this.httpOptions).pipe(
      tap((_) => {
        console.log(`activity with id: ${id} was deleted`);
      })
    );
  }
}
