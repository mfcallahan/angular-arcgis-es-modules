import { Component } from '@angular/core';
import { IMapPoint } from 'src/app/interfaces/iMapPoint';
import { ApiService } from 'src/app/services/api.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showSpinner = false;
  dataLoaded = false;

  constructor(readonly apiService: ApiService, readonly mapService: MapService) {}

  public async loadDataClick(): Promise<void> {
    this.showSpinner = true;
    const numPointsToLoad = 100;

    if (this.dataLoaded) {
      this.mapService.removeAllPoints(false);
    }

    const response: Array<IMapPoint> = await this.apiService.getRandomPointsInPhx(numPointsToLoad).toPromise();

    await this.mapService.addPointsToMap(response);

    this.showSpinner = false;
    this.dataLoaded = true;
  }

  public clearDataClick(): void {
    this.mapService.removeAllPoints(true);
    this.dataLoaded = false;
  }
}
