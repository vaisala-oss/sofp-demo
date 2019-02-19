//externals
import React from 'react';

//open layers and styles
import { Map, View } from 'ol';
import * as source from 'ol/source';
import * as format from 'ol/format';
import * as layer from 'ol/layer';
import { transformExtent, fromLonLat } from 'ol/proj';
import * as geom from 'ol/geom';
import * as style from 'ol/style';
import TileGrid from 'ol/tilegrid/TileGrid';
import * as loadingstrategy from 'ol/loadingstrategy';
import { optionsFromCapabilities } from 'ol/source/WMTS';

import * as _ from 'lodash';

import * as moment from 'moment';

import 'ol/ol.css';


// Adapted from https://taylor.callsen.me/using-reactflux-with-openlayers-3-and-other-third-party-libraries/
export class MyMap extends React.Component {
 
  componentDidMount() {
    var osmTileGrid = new source.OSM().tileGrid;
    var origin = osmTileGrid.getOrigin(0);
    var resolutions = [osmTileGrid.getResolutions()[8]];

    var myLargerTileGrid = new TileGrid({
        origin: origin,
        resolutions: resolutions,
        tileSize: 512
    });

    // create feature layer and vector source
    var featuresLayer = new layer.Vector({
      source: new source.Vector({
        features:[]
      })
    });

    var weatherSource = new source.Vector({
      format: new format.GeoJSON(),
      strategy: new loadingstrategy.tile(myLargerTileGrid),
      loader: function(extent, resolution, proj) {
        const time = {
          end: moment.utc()
        };
        time.start = moment.utc(time.end).add(-1, 'days');

        const url = 
          'http://beta.fmi.fi/data/3/wfs/sofp/collections/opendata_1m/items?'+
          [
            'ParameterName=Temperature',
            'time='+time.start.toISOString()+'/'+time.end.toISOString(),
            'bbox='+transformExtent(extent, 'EPSG:3857', 'EPSG:4326').join(','),
            'limit=100'
          ].join('&');


        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        var onError = function() {
          weatherSource.removeLoadedExtent(extent);
        }
        xhr.onerror = onError;
        xhr.onload = function() {
          if (xhr.status === 200) {
            const features = weatherSource.getFormat().readFeatures(xhr.responseText, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857'
            });

            weatherSource.addFeatures(features);
          } else {
             onError();
          }
        }
        xhr.send();
      }
    });

    var pointStyle = new style.Style({
      image: new style.Circle({
        radius: 7,
        fill: new style.Fill({color: 'black'}),
        stroke: new style.Stroke({
          color: [250, 210, 210], width: 2
        })
      })
    })
    var weatherLayer = new layer.Vector({
      source: weatherSource,
      style: pointStyle
    });


    // create map object with feature layer
    var map = new Map({
      target: this.refs.mapContainer,
      layers: [
        featuresLayer,
        weatherLayer
      ],
      view: new View({
        center: fromLonLat([24.95, 60.23]),
        zoom: 11,
        minZoom: 8,
        maxZoom: 20
      })
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var parser = new format.WMTSCapabilities();
        var capabilities = parser.read(this.responseText);
        var opts = optionsFromCapabilities(capabilities, {
            layer: 'taustakartta',
            matrixSet: 'WGS84_Pseudo-Mercator',
            requestEncoding: 'REST'
        });
        var wmtsLayer = new layer.Tile({
            source: new source.WMTS(opts)
        });
        wmtsLayer.setZIndex(-1);
        map.addLayer(wmtsLayer);
      }
    };
    xhttp.open("GET", "https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/WMTSCapabilities.xml", true);
    xhttp.send();


    map.on('click', this.handleMapClick.bind(this));

    // save map and layer references to local state
    this.setState({ 
      map: map,
      featuresLayer: featuresLayer
    });
  }

  // pass new features from props into the OpenLayers layer object
  componentDidUpdate(prevProps, prevState) {
    this.state.featuresLayer.setSource(
      new source.Vector({
        features: this.props.routes
      })
    );
  }

  handleMapClick(event) {
    // derive map coordinate (references map from Wrapper Component state)
    var clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);

    // create Point geometry from clicked coordinate
    var clickedPointGeom = new geom.Point( clickedCoordinate );
    console.log(clickedPointGeom);
    console.log(event);

    // TODO: show data
  }

  render () {
    return (
      <div ref="mapContainer"> </div>
    );
  }
}