import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/activity';
import { ActivityService } from 'src/app/shared/services/activity.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Input() activity!: Activity;
  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {}
}
