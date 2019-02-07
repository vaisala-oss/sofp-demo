//externals
import React from 'react';

//open layers and styles
import { Map, View } from 'ol';
import { Point } from 'ol/geom';
import { Vector as LayerVector, Tile as LayerTile } from 'ol/layer';
import { Vector as SourceVector, OSM as SourceOSM } from 'ol/source';
import 'ol/ol.css';

// Adapted from https://taylor.callsen.me/using-reactflux-with-openlayers-3-and-other-third-party-libraries/
export class MyMap extends React.Component {
 
  componentDidMount() {

    // create feature layer and vector source
    var featuresLayer = new LayerVector({
      source: new SourceVector({
        features:[]
      })
    });

    // create map object with feature layer
    var map = new Map({
      target: this.refs.mapContainer,
      layers: [
        //default OSM layer
        new LayerTile({
          source: new SourceOSM()
        }),
        featuresLayer
      ],
      view: new View({
        center: [-11718716.28195593, 4869217.172379018], //Boulder
        zoom: 13,
      })
    });

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
      new SourceVector({
        features: this.props.routes
      })
    );
  }

  handleMapClick(event) {
    // derive map coordinate (references map from Wrapper Component state)
    var clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);

    // create Point geometry from clicked coordinate
    var clickedPointGeom = new Point( clickedCoordinate );
    console.log(clickedPointGeom);
  }

  render () {
    return (
      <div ref="mapContainer"> </div>
    );
  }
}