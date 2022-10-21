import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  gemsData,
  GemData,
  Color,
  Effect,
  Quality,
  Stats,
} from './gems-database';

@Injectable({
  providedIn: 'root',
})
export class GemsService {
  private gems: BehaviorSubject<GemData[]> = new BehaviorSubject(gemsData);

  getGems(): Observable<GemData[]> {
    return this.gems.asObservable();
  }

  filterGems(
    haveAllSelectedEffects: boolean,
    effects: Set<Effect>,
    colors: Set<Color>,
    qualities: Set<Quality>
  ) {
    const _gems = gemsData
      .filter((gem) => this.inSetCeck(gem.quality, qualities))
      .filter((gem) => this.inSetCeck(gem.color, colors))
      .filter((gem) =>
        this.effectsFilter(gem.stats, haveAllSelectedEffects, effects)
      );

    this.gems.next(_gems);
  }

  private inSetCeck(data: any, setData: Set<any>): boolean {
    if (setData.size === 0) return true;
    return setData.has(data);
  }

  private effectsFilter(
    stats: Stats[],
    haveAllSelectedEffects: boolean,
    effects: Set<Effect>
  ) {
    if (effects.size === 0) return true;

    if (haveAllSelectedEffects) {
      let haveAll = [];

      for (let stat of stats) {
        haveAll.push(effects.has(stat.effect));
      }

      return haveAll.every((v) => v === true) && haveAll.length == effects.size;
    }

    let haveSome = false;

    for (let stat of stats) {
      if (effects.has(stat.effect)) {
        haveSome = true;
        break;
      }
    }

    return haveSome;
  }
}
