<template>
  <div class="home">
    <div id="map"></div>
    <!-- <button @click="update1()">更新轨迹1</button>
    <button @click="update2()">更新轨迹2</button> -->
  </div>
</template>

<script>
import "ol/ol.css";
import ol from "openlayers";
import "ol3-layerswitcher/src/ol3-layerswitcher.css";
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
      this.map = new ol.Map({
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
      this.map.addControl(layerSwitcher);
      this.addLine();
    },
    // 创建轨迹图层
    addLine() {
      this.source = new ol.source.Vector();
      let layer = new ol.layer.Vector({
        title: "线",
        source: this.source,
      });
      this.map.addLayer(layer);
    },
    // 更新轨迹
    updateline(coords) {
      this.source.clear();
      var lineString = new ol.geom.LineString(coords);
      lineString.transform("EPSG:4326", "EPSG:3857");
      let line = new ol.Feature({
        geometry: lineString,
      });
      let style = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "#ff00ff",
          width: 2,
        }),
      });
      line.setStyle(style);
      this.source.addFeature(line);
    },
    // 更新轨迹
    update1() {
      let coords = [
        [120.41, 36.82],
        [120.3, 36.82],
      ];
      this.updateline(coords);
    },
    // 更新轨迹
    update2() {
      let coords = [
        [120.41, 36.82],
        [120.3, 36.82],
        [120.41, 36.92],
      ];
      this.updateline(coords);
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
