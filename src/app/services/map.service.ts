import { ElementRef, Injectable, NgZone } from '@angular/core';
import { IMapPoint } from 'src/app/interfaces/iMapPoint';
import { EnvironmentService } from './environment.service';
import config from '@arcgis/core/config.js';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import Zoom from '@arcgis/core/widgets/Zoom';
import Graphic from '@arcgis/core/Graphic';

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
  public addAllMapWidgets(): void {
    const basemapToggle = new BasemapToggle({
      view: this.mapView,
      nextBasemap:
        this.environment.baseConfigs.defaultMapSettings.widgets.basemapToggle
          .nextBasemap,
    });

    const zoom = new Zoom({
      view: this.mapView,
    });

    this.mapView?.ui.add(
      basemapToggle,
      this.environment.baseConfigs.defaultMapSettings.widgets.basemapToggle
        .position
    );
    this.mapView?.ui.add(
      zoom,
      this.environment.baseConfigs.defaultMapSettings.widgets.zoom.position
    );
  }

  public removeAllPoints(zoomToDefaultExtent: boolean): void {
    this.map?.removeAll();

    if (zoomToDefaultExtent) {
      this.mapView?.goTo({
        center: [
          this.environment.baseConfigs.defaultMapSettings.centerLon,
          this.environment.baseConfigs.defaultMapSettings.centerLat,
        ],
        zoom: this.environment.baseConfigs.defaultMapSettings.zoomLevel,
      });
    }
  }

  public async addPointsToMap(mapPoints: Array<IMapPoint>): Promise<void> {
    this.removeAllPoints(false);

    const graphics = mapPoints.map((point, i) => {
      return new Graphic({
        attributes: {
          ObjectId: i + 1,
          location: point.location,
        },
        geometry: {
          type: 'point',
          longitude: point.lon,
          latitude: point.lat,
        },
      } as any);
      // TODO: Check error "Type is not assignable to type 'GeometryProperties'. Object literal may only specify known properties, and
      // 'type' does not exist in type 'RendererProperties'."
    });

    const randomPointsLayer = new FeatureLayer({
      source: graphics,
      objectIdField: 'OBJECTID',
      renderer: {
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          color: '#ffff00',
          size: '12px',
          outline: {
            color: '#0d0d0d',
            width: 1.5,
          },
        },
      } as any,
      // TODO: Check error "Type is not assignable to type 'RendererProperties'. Object literal may only specify known properties, and
      // 'type' does not exist in type 'RendererProperties'."
      popupTemplate: {
        title: 'Map points',
        content: [
          {
            type: 'fields',
            fieldInfos: [
              {
                fieldName: 'location',
                label: 'Location',
                visible: true,
              },
              {
                fieldName: 'latitude',
                label: 'Latitude',
                visible: true,
              },
              {
                fieldName: 'longitude',
                label: 'longitude',
                visible: true,
              },
            ],
          },
        ],
      },
    });

    this.map?.layers.add(randomPointsLayer);

    await this.zoomToLayerExtent(randomPointsLayer);
  }

  public async zoomToLayerExtent(layer: FeatureLayer): Promise<void> {
    this.mapView?.goTo(await layer.queryExtent());
  }
}
