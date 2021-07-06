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
import { getCarCurrentPosition } from "@/api/index.js";
import ssc from "@/assets/ssc-b.png";
import{cloneDeep} from 'lodash'

export default {
  name: "Page",
  data() {
    return {
      timer: "",
      map: {},
      source: {},
      sourcePositon: [],
      iconStyle: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.9],
          src: ssc,
          crossOrigin: "",
          scale: 0.1,
        }),
        text: new ol.style.Text({
          text: "",
          scale: 1,
          textAlign: "center",
          textBaseline: "top",
        }),
      }),
    };
  },
  mounted() {
    this.initMap();
    this.loadPositions();
    this.timer = setInterval(this.loadPositions, 10000);
  },
  methods: {
    getIconStyle(text) {
      let iconStyle = cloneDeep(this.iconStyle);
      iconStyle.getText().setText(text);
      return iconStyle;
    },
    // 创建地图
    initMap() {
      this.sourcePositon = new ol.source.Vector();
      this.map = new ol.Map({
        target: "map",
        layers: [
          new ol.layer.Tile({
            title: "天地图矢量",
            source: new ol.source.XYZ({
              url:
                "http://t" +
                Math.round(Math.random() * 7) +
                ".tianditu.com/DataServer?T=vec_c&tk=de0651adcef9fd91fd43fa7378a44e7a&x={x}&y={y}&l={z}",
              projection: "EPSG:4326",
            }),
          }),
          new ol.layer.Tile({
            title: "天地图影像",
            source: new ol.source.XYZ({
              url:
                "http://t" +
                Math.round(Math.random() * 7) +
                ".tianditu.com/DataServer?T=img_C&tk=de0651adcef9fd91fd43fa7378a44e7a&x={x}&y={y}&l={z}",
              projection: "EPSG:4326",
            }),
          }),
          new ol.layer.Tile({
            title: "厂区地图",
            source: new ol.source.TileWMS({
              url: window.env.basemap,
              params: {
                FORMAT: "image/png",
                VERSION: "1.1.0",
                LAYERS: window.env.layer,
              },
            }),
          }),
          new ol.layer.Vector({
            title: "车辆位置",
            source: this.sourcePositon,
          }),
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([118.866, 39.7]),
          zoom: 15,
        }),
      });
      var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: "Legende",
      });
      this.map.addControl(layerSwitcher);
      // this.addLine();
    },

    loadPositions() {
      // this.sourcePositon.clear();
      getCarCurrentPosition().then((val) => {
        //this. = val;
        if (this.sourcePositon.features && this.sourcePositon.features.length >= val.length) {
          val.forEach((element, i) => {
            // 测试代码
            if(element.CarName =="3号洒水车"){
              debugger
              let randomlat = element.Lat+ Math.random()*(0.0005-0.0002)+0.0002
              this.sourcePositon.features[i].setStyle(this.getIconStyle(element.CarName)),
               this.sourcePositon.features[i].setGeometry(
                new ol.geom.Point(
                  ol.proj.fromLonLat([element.Lng * 1, randomlat * 1])
                )
              );
            }else{
               this.sourcePositon.features[i].setStyle(this.getIconStyle(element.CarName)),
               this.sourcePositon.features[i].setGeometry(
                new ol.geom.Point(
                  ol.proj.fromLonLat([element.Lng * 1, element.Lat * 1])
                )
              );
            }
            // this.sourcePositon.features[i].setStyle(this.getIconStyle(element.CarName)),
            //    this.sourcePositon.features[i].setGeometry(
            //     new ol.geom.Point(
            //       ol.proj.fromLonLat([element.Lng * 1, element.Lat * 1])
            //     )
            //   );
           
          });
        } else {
          val.forEach((element, i) => {
            if (i < this.sourcePositon.length) {
              //  这里设置2个属性
                 this.sourcePositon.features[i].setStyle(this.getIconStyle(element.CarName)),
                 this.sourcePositon.features[i].setGeometry(
                  new ol.geom.Point(
                    ol.proj.fromLonLat([element.Lng * 1, element.Lat * 1])
                  )
                );
            } else {
              let iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(
                  ol.proj.fromLonLat([element.Lng * 1, element.Lat * 1])
                ),
              });

              iconFeature.setStyle(this.getIconStyle(element.CarName));
              this.sourcePositon.addFeature(iconFeature);
            }
          });
        }
      });
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
