<template>
  <div class="home">
    <div id="map"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import "ol3-layerswitcher/src/ol3-layerswitcher.css";
import ol from "openlayers";
import "ol3-layerswitcher/src/ol3-layerswitcher";
export default {
  name: "Page",
   data() {
    return {
      map: {},
      source: {},
    };
  },
  mounted() {    
    this.initMap();
  },
  methods: {
    // 创建地图
    initMap() {
      var map = new ol.Map({
        target: "map",
        layers: [
          new ol.layer.Tile({
            title: "厂区地图",
            source: new ol.source.TileWMS({
              url: "http://222.223.86.32:18080/geoserver/hxgt/wms",
              params: {
                'FORMAT': "image/png",
                'VERSION': "1.1.1",
                'LAYERS': "hxgt",
              },
            }),
          }),
       
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([118.866, 39.7]),
          zoom: 16,
        }),
      });
      var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: "Legende",
      });
      map.addControl(layerSwitcher);
    },
  
  },
};
</script>
<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
