import { BasemapId } from 'src/app/enums/basemapId';
import { WidgetPosition } from 'src/app/enums/widgetPosition';

const arcgisVersion = '4.17';

export const baseConfigs = {
  arcgisJsApiSettings: {
    apiUrl: `https://js.arcgis.com/${arcgisVersion}/`,
    cssUrl: `https://js.arcgis.com/${arcgisVersion}/esri/css/main.css`,
  },
  defaultMapSettings: {
    centerLat: 39.83,
    centerLon: -98.58,
    zoomLevel: 5,
    basemapId: BasemapId.streets,
    widgets: {
      basemapToggle: {
        position: WidgetPosition.topLeft,
        nextBasemap: BasemapId.hybrid,
      },
      zoom: {
        position: WidgetPosition.topRight,
      },
    },
  },
};
