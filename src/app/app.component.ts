import { Component } from '@angular/core';

import { GemData, Stats } from './gems-database';
import { GemsService } from './gems.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wotlk-gemfinder';
  gems: GemData[] = [];

  constructor(private gemsService: GemsService) {
    this.gemsService.getGems().subscribe((data) => {
      this.gems = [...data];
    });
  }

  getStatsEffect(stats: Stats[]) {
    let values = [];

    for(let row of stats) {
      values.push([row.value, row.effect].join(" "));
    }

    return values.join(" and ");
  }
}
