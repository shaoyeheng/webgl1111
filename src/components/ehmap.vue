<template>
   <div>
      <div id='GvolContainer'></div>
      <!-- <peach-joystick :options="options" @move="move" /> -->
      <el-dialog title=false :visible="dialogVisible" :fullscreen="true">
         <span>
            
         </span>
      </el-dialog>
      <!-- <iframe id="iframe1"  src="./merf/index.html?dir=../hfqz_05/assets&mouseMode=fps&quality=low" style="width: 100vw;height:100vh;border: 0px;margin:0;"></iframe> -->
   </div>
</template>
   
<script>
   import * as Cesium from 'cesium'
   import '../../public/lib/geovisearth.sdk.js'
   export default {
      name: 'ehmap',
      props: {
         msg: String
      },
      data() {
         return {
            dialogVisible: false,
            closeFlag: false,
            options:{size: 110,appendToBody:true}
         };
      },
      mounted: function () {
         this.initViewer();
      },
      created: function() {
         // this.$nextTick(() => {
         //       let index = layer.open({
         //          id:"3ewrwerwer",
         //          type: 2, // page 层类型
         //          title: false,
         //          area: ['99vw', '99vh'],
         //          shade: 1, // 遮罩透明度
         //          closeBtn: 0,
         //          shadeClose: false,
         //          maxmin: false,
         //          scrollbar: false,
         //          anim: 5, // 0-6 的动画形式，-1 不开启
         //          content: './merf/index.html?dir=../merf/hfqz&mouseMode=fps&quality=medium',
         //          success: function(layero, index){
         //             layer.close(index)
         //          },
         //          hideOnClose: true,
         //          style: 'display:none'
         //       });
         //    })
      },
      methods: {
         move(e){
            console.log('99999999999',e)
         },

         initViewer() {
            let _this = this

            // let mapToken = GVOL.Tool.TokenHelper.getGeovisDaasToken();
            let mapToken = '6cd6ac90663d949eb712a0695305a22ceabf1c82d825558f3b20985cb54053ed'

            //创建viewer实例
            var engine = new GVOL.GvolEngine('GvolContainer', {
                  baseLayerPicker: false,
                  imageryProvider: new Cesium.UrlTemplateImageryProvider({
                  url: `https://tiles.geovis.online/base/v1/img/{z}/{x}/{y}?format=webp&token=` + mapToken
                  })
            },null);

            // var engine = new GVOL.GvolEngine('GvolContainer', {
            //     baseLayerPicker: false,
            //     imageryProvider: new GVOL.LayerMgr.BaiduImageryProvider({
            //         url: "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1"
            //     })
            // },null);

            engine.viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                url: `https://tiles.geovis.online/base/v1/cat/{z}/{x}/{y}?format=webp&tmsIds=w&token=` + mapToken
            }));

            // const viewer = new Cesium.Viewer(document.getElementById('GvolContainer')); 
            // viewer.entities.add({
            // // fromDegrees（经度，纬度，高度，椭球，结果）从以度为单位的经度和纬度值返回Cartesian3位置
            //    position : new Cesium.Cartesian3.fromDegrees(117.135879,31.824845, 0),
            //    point : {
            //         pixelSize : 15,//点的大小
            //         color: Cesium.Color.RED,//点的颜色
            //         outlineWidth:2,//边框宽度
            //         outlineColor: Cesium.Color.WHITE.withAlpha(0.4),//边框颜色
            //   }
            // });

            // layer.load(0, {shade: true});
            // layer.msg('场景预加载中...', {
            //    icon: 16,
            //    shade: 1
            // })

            // this.drawPoint(engine,'EditorPoint',117.135879,31.824845,0,'orange',20,0,null,false)

            // 添加点击事件
            let handler = new Cesium.ScreenSpaceEventHandler(engine.viewer.scene.canvas);
            handler.setInputAction(function(click) {
               let pick = engine.viewer.scene.pick(click.position)
               if (Cesium.defined(pick)) {
                  _this.openPage()
               }
               // if (pick && pick.id) {
               //    engine.viewer.entities.values.map((item)=>{
               //       if(pick.id && (item.id == pick.id.id)){
               //          if(item){
               //             console.log('999999999', item)
               //          }
               //       }
               //    })
               // }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            let point1 = null;
            let isOpen = false;
            //监听鼠标滚轮事件
            handler.setInputAction((wheelment) => {
            //从Cesium中获取当前地图瓦片等级
               let tiles = new Set();
               let tilesToRender = engine.viewer.scene.globe._surface._tilesToRender;
               if (Cesium.defined(tilesToRender)) {
                  for (let i = 0; i < tilesToRender.length; i++) {
                  tiles.add(tilesToRender[i].level);
                  }

                  let height = Math.ceil(engine.viewer.camera.positionCartographic.height); 
                  
                  if(height < 1500000 && !point1){
                     point1 = engine.viewer.entities.add({
                        id:'point1',
                        position : new Cesium.Cartesian3.fromDegrees(117.100089,31.835322, 0),
                        point : {
                           pixelSize : 16,//点的大小
                           color: Cesium.Color.YELLOW,//点的颜色
                           outlineWidth:2,//边框宽度
                           outlineColor: Cesium.Color.WHITE.withAlpha(0.4),//边框颜色
                           show: true
                        }
                     })

                     //2.判断当前视角是否可见
                     let cameraOccluder = new Cesium.EllipsoidalOccluder(Cesium.Ellipsoid.WGS84, engine.viewer.camera.position);
                     let viewerVisible = cameraOccluder.isPointVisible(point1);
                     
                  }

                  console.log('999999999999999', height)

                  if(height > 1500000 && point1){
                     engine.viewer.entities.remove(point1)
                     point1 = null
                  }

                  if(height < 1000 && !isOpen){
                     this.openPage()
                     isOpen = true
                  }

                  if(height > 1000 && isOpen){
                     isOpen = false
                  }
               }
            }, Cesium.ScreenSpaceEventType.WHEEL);

            
            // this.viewer.camera.moveEnd.addEventListener(this.onMoveendMap); 
            // //监听地图移动完成事件 
            // onMoveendMap = () => { const me = this; 
            //    //获取当前相机高度 
            //    let height = Math.ceil(me.viewer.camera.positionCartographic.height); 
            //    let zoom = me.heightToZoom(height); 
            //    let bounds = me.getCurrentExtent(); 
            //    console.log('地图变化监听事件',zoom,bounds); 
            // };

         },
         closePage(){
            this.dialogVisible = false
         },
         drawPoint(engine,point,lon,lat,alt,color,pixelSize,outlineWidth,outlineColor) {
          point = {     
            gvolObject:{
              gvolType:point,
              properties: {
                color: color,
                pixelSize: pixelSize,
                outlineShow: true,   //是否显示外边框
                outlineWidth: outlineWidth,
                outlineColor: outlineColor,
                LabelName: "点",
              },
              geometry: {
                coordinates: [lon, lat],
              },
            }
          };

          engine.plot.editor.removeOperator()
          engine.graphicLayer.add(point);
        },
        openPage(){
            // this.dialogVisible = true
            this.$nextTick(() => {
               let index = layer.open({
                  id:"3ewrwerwer",
                  type: 2, // page 层类型
                  title: false,
                  area: ['99vw', '99vh'],
                  shade: 0.6, // 遮罩透明度
                  closeBtn: 0,
                  shadeClose: false,
                  maxmin: false,
                  scrollbar: false,
                  anim: 0, // 0-6 的动画形式，-1 不开启
                  // content: './merf/index.html?dir=../merf/hfqz&mouseMode=fps&quality=medium',
                  content: './merf.web.202306021802/renderer/renderer.html?dir=../data/assets&amp;quality=medium',
                  success: function(layero, index){
                     layer.full(index); // 最大化
                  },
                  hideOnClose: true
               });
            })
         }
      }
   }
</script>