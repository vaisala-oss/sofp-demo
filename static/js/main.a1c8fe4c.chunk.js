(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){},102:function(e,t,a){},113:function(e,t,a){"use strict";a.r(t);var n=a(47),o=a.n(n),r=a(84),i=a.n(r),s=(a(100),a(65)),c=a(66),u=a(80),l=a(67),d=a(81),m=(a(102),a(122)),p=a(111),w=a(127),f=a(125),h=a(112),b=a(123),v=a(124),y=a(121),g=a(126),k=a(11),j=a(20),O=a(107),S=a(114),E=a(108),x=a(109),P=a(57),C=a(74),G=a(82),M=(a(105),function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=(new w.a).tileGrid,t=e.getOrigin(0),a=[e.getResolutions()[8]],n=new P.a({origin:t,resolutions:a,tileSize:512}),o=new y.a({source:new f.a({features:[]})}),r=new f.a({format:new b.a,strategy:new C.b(n),loader:function(e,t,a){var n={end:G.utc()};n.start=G.utc(n.end).add(-1,"days");var o="https://cors-anywhere.herokuapp.com/http://beta.fmi.fi/data/3/wfs/sofp/collections/opendata_1m/items?"+["ParameterName=Temperature","time="+n.start.toISOString()+"/"+n.end.toISOString(),"bbox="+Object(k.h)(e,"EPSG:3857","EPSG:4326").join(","),"limit=100"].join("&"),i=new XMLHttpRequest;i.open("GET",o);var s=function(){r.removeLoadedExtent(e)};i.onerror=s,i.onload=function(){if(200===i.status){var e=r.getFormat().readFeatures(i.responseText,{dataProjection:"EPSG:4326",featureProjection:"EPSG:3857"});r.addFeatures(e)}else s()},i.send()}}),i=new O.b({image:new S.a({radius:7,fill:new E.a({color:"black"}),stroke:new x.a({color:[250,210,210],width:2})})}),s=new y.a({source:r,style:i}),c=new m.a({target:this.refs.mapContainer,layers:[o,s],view:new p.a({center:Object(k.c)([24.95,60.23]),zoom:11,minZoom:8,maxZoom:20})}),u=new XMLHttpRequest;u.onreadystatechange=function(){if(4===this.readyState&&200===this.status){var e=(new v.a).read(this.responseText),t=Object(h.b)(e,{layer:"taustakartta",matrixSet:"WGS84_Pseudo-Mercator",requestEncoding:"REST"}),a=new g.a({source:new h.a(t)});a.setZIndex(-1),c.addLayer(a)}},u.open("GET","https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/WMTSCapabilities.xml",!0),u.send(),c.on("click",this.handleMapClick.bind(this)),this.setState({map:c,featuresLayer:o})}},{key:"componentDidUpdate",value:function(e,t){this.state.featuresLayer.setSource(new f.a({features:this.props.routes}))}},{key:"handleMapClick",value:function(e){var t=this.state.map.getCoordinateFromPixel(e.pixel),a=new j.a(t);console.log(a),console.log(e)}},{key:"render",value:function(){return o.a.createElement("div",{ref:"mapContainer"}," ")}}]),t}(o.a.Component)),T=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(M,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},94:function(e,t,a){e.exports=a(113)}},[[94,2,1]]]);
//# sourceMappingURL=main.a1c8fe4c.chunk.js.map