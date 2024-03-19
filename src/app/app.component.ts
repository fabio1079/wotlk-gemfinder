import { Component } from '@angular/core';

import { GemData, Stats, Color, Effect, Quality } from './gems-database';
import { GemsService } from './gems.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  gems: GemData[] = [];
  haveAllSelectedEffects: boolean = false;
  selectedEffects: Set<Effect> = new Set();
  selectedColors: Set<Color> = new Set();
  selectedQualities: Set<Quality> = new Set();

  constructor(private gemsService: GemsService) {
    this.gemsService.getGems().subscribe((data) => {
      this.gems = data;
    });
  }

  get effects() {
    // https://bobbyhadz.com/blog/typescript-convert-enum-to-array-of-objects
    return Object.keys(Effect).map((name) => {
      return {
        name,
        value: Effect[name as keyof typeof Effect],
      };
    });
  }

  get colors() {
    return Object.keys(Color).map((name) => {
      return {
        name,
        value: Color[name as keyof typeof Color],
      };
    });
  }

  get qualities() {
    return Object.keys(Quality).map((name) => {
      return {
        name,
        value: Quality[name as keyof typeof Quality],
      };
    });
  }

  getStatsEffect(stats: Stats[]) {
    let values = [];

    for (let row of stats) {
      values.push([row.value, row.effect].join(' '));
    }

    return values.join(' and ');
  }

  getSquareColor(color: Color) {
    let _color = ['square', 'color'];

    switch (color) {
      case Color.red:
        _color.push('red');
        break;
      case Color.blue:
        _color.push('blue');
        break;
      case Color.yellow:
        _color.push('yellow');
        break;
      case Color.orange:
        _color.push('orange');
        break;
      case Color.purple:
        _color.push('purple');
        break;
      case Color.green:
        _color.push('green');
        break;
    }

    return _color;
  }

  toggleEffect(effect: Effect) {
    if (this.selectedEffects.has(effect)) {
      this.selectedEffects.delete(effect);
    } else {
      this.selectedEffects.add(effect);
    }

    this.triggerFilter();
  }

  toggleColor(color: Color) {
    if (this.selectedColors.has(color)) {
      this.selectedColors.delete(color);
    } else {
      this.selectedColors.add(color);
    }

    this.triggerFilter();
  }

  toggleQuality(quality: Quality) {
    if (this.selectedQualities.has(quality)) {
      this.selectedQualities.delete(quality);
    } else {
      this.selectedQualities.add(quality);
    }

    this.triggerFilter();
  }

  toggleHaveAllEffects() {
    this.haveAllSelectedEffects = !this.haveAllSelectedEffects;
    this.triggerFilter();
  }

  private triggerFilter() {
    this.gemsService.filterGems(
      this.haveAllSelectedEffects,
      this.selectedEffects,
      this.selectedColors,
      this.selectedQualities
    );
  }
}