(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{117:function(e,t,a){e.exports=a(175)},122:function(e,t,a){},124:function(e,t,a){},169:function(e,t,a){},175:function(e,t,a){"use strict";a.r(t);var n=a(22),o=a.n(n),r=a(104),i=a.n(r),s=(a(122),a(75)),u=a(76),c=a(91),p=a(77),l=a(92),d=(a(124),a(185)),m=a(177),h=a(190),f=a(188),v=a(176),w=a(186),b=a(187),E=a(184),g=a(189),j=a(11),y=a(172),O=a(178),P=a(173),S=a(174),k=a(0),C=a(62),x=a(83),T=a(107),G=a(39),I=a(93),M=a(105),F=a.n(M),L=a(78),N=a(106);a(167),a(169);I.b.addAdapter(F.a);var R=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(p.a)(t).call(this,e))).state={map:null,popup:{hdms:null,features:[],temperatureChart:{}}},a}return Object(l.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=(new h.a).tileGrid,t=e.getOrigin(0),a=[e.getResolutions()[8]],n=this.refs.mapPopup,o=this.refs.mapPopupCloser,r=new T.a({element:n,autoPan:!0,autoPanAnimation:{duration:250}});o.onclick=function(){return r.setPosition(void 0),o.blur(),!1};var i=new C.a({origin:t,resolutions:a,tileSize:512}),s=new f.a({format:new w.a,strategy:new x.b(i),loader:function(e,t,a){var n={end:L.utc()};n.start=L.utc(n.end).add(-2,"days");var o="http://beta.fmi.fi/data/3/wfs/sofp/collections/opendata_1h/items?"+["observedPropertyName=Temperature","time="+n.start.toISOString()+"/"+n.end.toISOString(),"bbox="+Object(j.i)(e,"EPSG:3857","EPSG:4326").join(","),"limit=500"].join("&"),r=new XMLHttpRequest;r.open("GET",o);var i=function(){s.removeLoadedExtent(e)};r.onerror=i,r.onload=function(){if(200===r.status){var e=s.getFormat().readFeatures(r.responseText,{dataProjection:"EPSG:4326",featureProjection:"EPSG:3857"});s.addFeatures(e)}else i()},r.send()}}),u=new y.b({image:new O.a({radius:7,fill:new P.a({color:"black"}),stroke:new S.a({color:[250,210,210],width:2})})}),c=new E.a({source:s,style:u}),p=new d.a({target:this.refs.mapContainer,layers:[c],overlays:[r],view:new m.a({center:Object(j.c)([24.95,60.23]),zoom:11,minZoom:8,maxZoom:20})}),l=new XMLHttpRequest;l.onreadystatechange=function(){if(4===this.readyState&&200===this.status){var e=(new b.a).read(this.responseText),t=Object(v.b)(e,{layer:"taustakartta",matrixSet:"WGS84_Pseudo-Mercator",requestEncoding:"REST"}),a=new g.a({source:new v.a(t)});a.setZIndex(-1),p.addLayer(a)}},l.open("GET","https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/WMTSCapabilities.xml",!0),l.send(),p.on("singleclick",this.openPopup.bind(this)),this.setState({map:p,weatherSource:s,popupCloser:o,overlay:r})}},{key:"openPopup",value:function(e){var t=this.state.popup,a=e.coordinate,n=k.b([a]);n=k.c(n,500),t.features=this.state.weatherSource.getFeaturesInExtent(n),t.temperatureChart={},0!==t.features.length?(t.hdms=Object(G.e)(Object(j.g)(a)),t.temperatureChart=N.reduce(t.features,function(e,t){return e[t.values_.resultTime]=t.values_.result,e},{}),this.state.overlay.setPosition(a),this.setState({popup:t})):this.state.popupCloser.onclick()}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",{ref:"mapContainer"}),o.a.createElement("div",{ref:"mapPopup",id:"popup",className:"ol-popup"},o.a.createElement("a",{href:"#close-popup",ref:"mapPopupCloser",id:"popup-closer",className:"ol-popup-closer"},"\xa0"),o.a.createElement("div",{id:"popup-content"},o.a.createElement("p",null,"You clicked here:"),o.a.createElement("code",null,this.state.popup.hdms),o.a.createElement("h3",null,"Temperature"),o.a.createElement(I.a,{data:this.state.popup.temperatureChart}))))}}]),t}(o.a.Component),W=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(R,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(W,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[117,2,1]]]);
//# sourceMappingURL=main.97f5302a.chunk.js.map