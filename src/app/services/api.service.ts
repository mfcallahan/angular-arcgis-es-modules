import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { IMapPoint } from '../interfaces/iMapPoint';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(readonly environment: EnvironmentService, readonly httpClient: HttpClient) {}

  public getRandomPointsInPhx(numPoints: number): Observable<Array<IMapPoint>> {
    const params = new HttpParams().set('numPoints', numPoints.toString());

    return this.httpClient.get(this.environment.randomPtsPhxUrl, { params }) as Observable<Array<IMapPoint>>;
  }
}
