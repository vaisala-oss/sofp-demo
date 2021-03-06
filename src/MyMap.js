//externals
import React from 'react';

//open layers and styles
import { Map, View } from 'ol';
import * as source from 'ol/source';
import * as format from 'ol/format';
import * as layer from 'ol/layer';
import { transformExtent, fromLonLat, toLonLat } from 'ol/proj';
import * as style from 'ol/style';
import * as extent from 'ol/extent';
import TileGrid from 'ol/tilegrid/TileGrid';
import * as loadingstrategy from 'ol/loadingstrategy';
import { optionsFromCapabilities } from 'ol/source/WMTS';

import Overlay from 'ol/Overlay';
import {toStringHDMS} from 'ol/coordinate.js';

import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'

import * as moment from 'moment';

import * as _ from 'lodash';

import 'ol/ol.css';
import './MyMap.css';

ReactChartkick.addAdapter(Chart);

// Adapted from https://taylor.callsen.me/using-reactflux-with-openlayers-3-and-other-third-party-libraries/
export class MyMap extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      popup: {
        hdms: null,
        features: [],
        temperatureChart: {}
      }
    }
  }

  componentDidMount() {
    var osmTileGrid = new source.OSM().tileGrid;
    var origin = osmTileGrid.getOrigin(0);
    var resolutions = [osmTileGrid.getResolutions()[8]];

    const popupContainer = this.refs.mapPopup;
    const popupCloser = this.refs.mapPopupCloser;
    
    var overlay = new Overlay({
      element: popupContainer,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    popupCloser.onclick = function() {
      overlay.setPosition(undefined);

      popupCloser.blur();
      return false;
    };

    var myLargerTileGrid = new TileGrid({
        origin: origin,
        resolutions: resolutions,
        tileSize: 512
    });

    var weatherSource = new source.Vector({
      format: new format.GeoJSON(),
      strategy: new loadingstrategy.tile(myLargerTileGrid),
      loader: function(extent, resolution, proj) {
        const time = {
          end: moment.utc()
        };
        time.start = moment.utc(time.end).add(-2, 'days');

        const url = 
          // This is a nasty hack to get around beta.fmi.fi's lack of HTTPS support
          'https://cors-anywhere.herokuapp.com/' +
          'http://beta.fmi.fi/data/3/wfs/sofp/collections/opendata_1h/items?'+
          [
            'observedPropertyName=Temperature',
            'time='+time.start.toISOString()+'/'+time.end.toISOString(),
            'bbox='+transformExtent(extent, 'EPSG:3857', 'EPSG:4326').join(','),
            'limit=500'
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
        weatherLayer
      ],
      overlays: [overlay],
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


    map.on('singleclick', this.openPopup.bind(this));

    // save map and layer references to local state
    this.setState({ 
      map,
      weatherSource,
      popupCloser,
      overlay
    });
  }

  openPopup(evt) {
    const popup = this.state.popup;

    var coordinate = evt.coordinate;
    var ext = extent.boundingExtent([coordinate]);

    ext = extent.buffer(ext, 7 * this.state.map.getView().getResolution());

    popup.features = this.state.weatherSource.getFeaturesInExtent(ext);
    popup.temperatureChart = {};
    if (popup.features.length === 0) {
      this.state.popupCloser.onclick();
      return;
    }

    popup.hdms = toStringHDMS(toLonLat(coordinate));
    
    popup.temperatureChart = _.reduce(popup.features, (memo, f) => { memo[f.values_.resultTime] = f.values_.result; return memo;}, {});

    this.state.overlay.setPosition(coordinate);
    this.setState({ popup });
  }

  render () {
    return (
      <div>
        <div ref="mapContainer">
        </div>
        <div ref="mapPopup" id="popup" className="ol-popup">
          <a href="#close-popup" ref="mapPopupCloser" id="popup-closer" className="ol-popup-closer">&nbsp;</a>
          <div id="popup-content">
            <p>You clicked here:</p>
            <code>{this.state.popup.hdms}</code>
            <h3>Temperature</h3>
            <LineChart data={this.state.popup.temperatureChart} />
            
          </div>
        </div>
      </div>
    );
  }
}