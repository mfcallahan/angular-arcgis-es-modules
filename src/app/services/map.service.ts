import { ElementRef, Injectable, NgZone } from '@angular/core';
import { IMapPoint } from 'src/app/interfaces/iMapPoint';
import { EnvironmentService } from './environment.service';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import config from '@arcgis/core/config.js';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map?: Map;
  mapView?: MapView;
  randomPointsLayer?: FeatureLayer;

  constructor(private readonly environment: EnvironmentService) {}

  // Initialize a default Map object for the app, which is rendered with a MapView that is bound to the DOM
  // element inside parameter 'mapElementRef'
  public initDefaultMap(mapElementRef?: ElementRef): void {
    // Set this property when using routes in order to resolve the /assets correctly.
    // IMPORTANT: the directory path may be different between your product app and your dev app
    // config.assetsPath = "/assets";
    config.assetsPath = 'assets/';

    this.map = new Map({
      basemap: this.environment.baseConfigs.defaultMapSettings.basemapId,
    });

    this.mapView = new MapView({
      map: this.map,
      center: [
        this.environment.baseConfigs.defaultMapSettings.centerLon,
        this.environment.baseConfigs.defaultMapSettings.centerLat,
      ],
      zoom: this.environment.baseConfigs.defaultMapSettings.zoomLevel,
      container: mapElementRef?.nativeElement,
      ui: {
        components: ['attribution'],
      },
    });
  }

  // Create instances of widgets and add them to the MapView
  public addAllMapWidgets(): void {}

  public removeAllPoints(zoomToDefaultExtent: boolean): void {}

  public async addPointsToMap(mapPoints: Array<IMapPoint>): Promise<void> {}

  public async zoomToLayerExtent(layer: FeatureLayer): Promise<void> {}
}
