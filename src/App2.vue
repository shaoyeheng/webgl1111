<template>
  <div id='GvolContainer'></div>
  </template>
  
  <script>
  import * as Cesium from 'cesium'
  import '../public/lib/geovisearth.sdk.js'
  export default {
  name: 'Gvol',
  props: {
     msg: String
  },
  mounted: function () {    
     this.initViewer();
  },
  methods: {
     initViewer() {
      console.log('99999999999999999',GVOL)
      let mapToken = '6cd6ac90663d949eb712a0695305a22ceabf1c82d825558f3b20985cb54053ed';
      //创建viewer实例
      var CustomContainer = new GVOL.GvolEngine('GvolContainer', {
          baseLayerPicker: false,
          imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: `https://tiles.geovis.online/base/v1/img/{z}/{x}/{y}?format=webp&token=` + mapToken
          })
      },null)
     },
  }
  }
  </script>