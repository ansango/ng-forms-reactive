import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/activity';
import { ActivityService } from 'src/app/shared/services/activity.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  activities!: Activity[];
  selectedActivity!: Activity;
  
  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.getActivities();
  }

  onSelect(activity: Activity): void {
    this.selectedActivity = activity;
  }
  
  getActivities(): void {
    this.activityService
      .getActivities()
      .subscribe((activities) => (this.activities = activities));
  }
}
