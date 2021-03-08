import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/activity';
import { ActivityService } from 'src/app/shared/services/activity.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites?: Activity[];
  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.favorites = this.activityService.getFavorites();
  }

  removeFavorite(favorite: Activity) {
    this.activityService.removeFavorite(favorite);
    this.getFavorites();
  }
}
