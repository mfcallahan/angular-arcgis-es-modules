import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapView', { static: false })
  mapElementRef?: ElementRef;

  constructor(readonly environment: EnvironmentService, readonly mapService: MapService) {}

  ngAfterViewInit(): void {
    this.mapService.initDefaultMap(this.mapElementRef);
    this.mapService.addAllMapWidgets();
  }
}
