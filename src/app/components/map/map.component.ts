import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapView', { static: false })
  mapElementRef?: ElementRef;

  constructor(readonly environment: EnvironmentService, readonly mapService: MapService) {}

  ngAfterViewInit(): void {
    this.mapService.initDefaultMap(this.mapElementRef);
    this.mapService.addAllMapWidgets();
  }

  ngOnDestroy(): void {
    if (this.mapService.mapView) {
      this.mapService.mapView.destroy();
    }
  }
}
