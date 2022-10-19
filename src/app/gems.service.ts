import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { gemsData, GemData } from './gems-database';

@Injectable({
  providedIn: 'root',
})
export class GemsService {
  private gems: BehaviorSubject<GemData[]> = new BehaviorSubject(gemsData);

  constructor() {}

  getGems(): Observable<GemData[]> {
    return this.gems.asObservable();
  }
}
