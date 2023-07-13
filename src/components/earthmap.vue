<template>
    <div>
      <div id="earthmap">
        <!-- <baidu-map
          id="allmap"
          @ready="mapReady">
        </baidu-map> -->
      </div>
      <el-dialog title="全真实景" :visible.sync="drawer" :fullscreen="true">
        <span>
          <SdkDemo msg="全真实景" :sceneX="sceneX" v-if="flag"/>
        </span>
        <el-button v-if="closeFlag" @click="closePage" type="info" size="mini" round style="z-index: 99;position: absolute;left: 48vw;bottom: 60px;">关  闭</el-button>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import '../../public/lib/resources/gvolCesium/Widgets/widgets.css'
  import * as Cesium from 'cesium';
  import { useCesium } from '@gvol-org/daassdk.cesium';
  import SdkDemo from './../pages/SdkDemo.vue'
  
  export default {
    name: 'bdmap',
    props: {
      msg: String
    },
    components: {
        SdkDemo
    },
    data() {
      return {
        drawer: false,
        flag: false,
            sceneX: "LMC",
        level: 12,
        closeFlag: false
      };
    },
    mounted() {
        let dom = document.getElementById("earthmap")

        //创建Cesium.Viewer实例
        const viewer = new Cesium.Viewer(dom); 

        //通过sdk传入viewer实例
        let instance = useCesium(viewer);

        //添加图层
        let layer = instance.addLayer({
            name: 'yingxiang',
            index: 0,
            baseUrl: "https://tiles1.geovisearth.com/base/v1/img/{z}/{x}/{y}",
            tmsIds: "w",
            visible:true,
            format:'webp',
            token: "6cd6ac90663d949eb712a0695305a22ceabf1c82d825558f3b20985cb54053ed",
            minimumLevel: 0,
            maximumLevel: 18,
        })
        layer.show = true

        let yxzjLayer = instance.addLayer({
            name: '影像注记',
            index: 1,
            subdomains: '123',
            baseUrl: "https://tiles{s}.geovisearth.com/base/v1/cia/{z}/{x}/{y}",
            tmsIds: "w",
            format:'webp',
            token: "6cd6ac90663d949eb712a0695305a22ceabf1c82d825558f3b20985cb54053ed",
            minimumLevel: 0,
            maximumLevel: 18
        })
        yxzjLayer.show = true
    },
    methods: {
        mapReady({BMap, map}) {
          let _this = this
  
          // 选择一个经纬度作为中心点
          this.point = new BMap.Point(116.817633,31.734983);
          map.centerAndZoom(this.point, 12);
          map.enableScrollWheelZoom(true);
          map.addControl(new BMap.NavigationControl())
          map.addControl(new BMap.ScaleControl())
          // map.setMapType(BMAP_NORMAL_MAP)
          map.setMapType(BMAP_HYBRID_MAP)
  
          // 创建城市选择控件
          var cityControl = new BMap.CityListControl({
          // 控件的停靠位置（可选，默认左上角）
            // anchor: BMAP_ANCHOR_TOP_LEFT,
            // 控件基于停靠位置的偏移量（可选）
            offset: new BMap.Size(90, 15)
          })
          // 将控件添加到地图上
          map.addControl(cityControl);
  
          
          let marker = new BMap.Marker(new BMap.Point(116.817633,31.734983)); //创建柱标
          map.addOverlay(marker)
          //提示信息
          var infoWindow = new BMap.InfoWindow('刘铭传故居：全景三维地图')
          // 鼠标移上标注点要发生的事
          marker.addEventListener('mouseover', function() {
            this.openInfoWindow(infoWindow)
          })
          // 鼠标移开标注点要发生的事
          marker.addEventListener('mouseout', function() {
            this.closeInfoWindow(infoWindow)
          })
  
          marker.addEventListener('click', function() {
            _this.drawer = true
            _this.flag = true
            // setTimeout(function(){
              // _this.flag = true
            // }, 200)
            setTimeout(function(){
              _this.closeFlag = true
            }, 500)
          })
  
          map.addEventListener('zoomend', function(e) {
            if(map.getZoom() > 14 && _this.level < map.getZoom()){
              var point = new BMap.Point(116.817633,31.734983)
              var bounds = map.getBounds()
  
              if(_this.isPointInRect(point, bounds)){
                _this.drawer = true
                _this.flag = true
                // setTimeout(function(){
                  // _this.flag = true
                // }, 200)
                setTimeout(function(){
                  _this.closeFlag = true
                }, 500)
              }
            }
            _this.level = map.getZoom()
          })
        },
        /**
         * 判断点是否在矩形内
         * @param {Point} point 点对象
         * @param {Bounds} bounds 矩形边界对象
         * @returns {Boolean} 点在矩形内返回true,否则返回false
         */
        isPointInRect(point, bounds){
            var sw = bounds.getSouthWest(); //西南脚点
            var ne = bounds.getNorthEast(); //东北脚点
            return (point.lng >= sw.lng && point.lng <= ne.lng && point.lat >= sw.lat && point.lat <= ne.lat);
        },
        closePage(){
          this.drawer = false
        }
      }
  }
  </script>
  
  <style scoped>
  /* 设定地图的大小 */
  #earthmap{
    height: 98vh;
    width: 99vw;
    margin: 0;
    padding: 0;
  }
  </style>
  