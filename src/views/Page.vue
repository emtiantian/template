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
            title: "天地图",
            source: new ol.source.OSM(),
          }),
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([120.41, 36.82]),
          zoom: 10,
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
