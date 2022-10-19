import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { gemsData, GemData, Color, Effect, Quality } from './gems-database';

@Injectable({
  providedIn: 'root',
})
export class GemsService {
  private gems: BehaviorSubject<GemData[]> = new BehaviorSubject(gemsData);

  getGems(): Observable<GemData[]> {
    return this.gems.asObservable();
  }

  filterGems(
    effects: Set<Effect>,
    colors: Set<Color>,
    qualities: Set<Quality>
  ) {
    let _gems = gemsData.filter((gem) => {
      let checks: boolean[] = [];

      if (qualities.size > 0) {
        checks.push(qualities.has(gem.quality));
      }

      if (colors.size > 0) {
        checks.push(colors.has(gem.color));
      }

      if (effects.size > 0) {
        let has_effect = false;

        for (let stat of gem.stats) {
          if (effects.has(stat.effect)) {
            has_effect = true;
            break;
          }
        }

        checks.push(has_effect);
      }

      return checks.every((v) => v === true);
    });

    this.gems.next(_gems);
  }
}
