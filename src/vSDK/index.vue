<template>
	<viewX :sceneX="sceneX" :cameraPosition="cameraPosition" :cameraLookAt="cameraLookAt" :serverIp="serverIp" :serverPort="serverPort" :showNavi="showNavi" :onSceneInited="onSceneInited" :callback="callback"></viewX>
</template>

<script>

import viewX from "./view/Viewer.vue"
import emitter from "./utils/bus";
export default {
  props: {
    el: String,
    ability: Array,
    appId: [String, Number],
	sceneX: String,
	serverIp: String,
	serverPort: Number,
	cameraPosition: Object,
	cameraLookAt: Object,
	onSceneInited: Function,
    callback: Function,
	showNavi: true,
  },
  components: {
    viewX
  },
  data () {
    return {
      activeComponent: '',
	  msg:'1'
    }
  },
  created () {
    //this.activeComponent = this.ability[0]
  },
  mounted() {
  	console.log(this.sceneX)
	console.log(this.cameraPosition)
	emitter.on("handlerFinished",data=>{
		console.log("----mitt handlerFinished :"+data)
		this.msg = data
		//this.$forceUpdate()
		//this.handlerFinished(data)
	})
	emitter.on("mittcallback2",(data)=>{
		console.log("----mitt callbck---:"+data.callFunc)
		data.callFunc && data.callFunc("mitt  demo2 directly:"+data.p1);
		setTimeout(() => {
			data.callFunc && data.callFunc("mitt demo2 delay3000: "+data.p1);
		}, 3000);
		
	})
	emitter.on("mittcallback",(callFunc)=>{
		console.log("----mitt callbck---:"+callFunc)
		callFunc && callFunc("mitt  demo directly:");
		setTimeout(() => {
			callFunc && callFunc("mitt demo delay3000: ");
		}, 3000);
		
	})
	emitter.on("setCameraPose",(data)=>{
		console.log(data)
	});
  },

  methods: {
	  
	  handClick(){
		  eval("handleClose(done)")
	  },
    handlerFinished (componentName) {
		console.log("----in handle")
		// this.callback && this.callback(this.ability);
  //     let lastChild = this.ability[this.ability.length - 1]
  //     if (this.ability.length > 1 && lastChild != componentName) {
  //       let index = this.ability.indexOf(componentName);
  //       this.activeComponent = this.ability[index + 1]
  //     } else {
  //       this.callback && this.callback();
  //     }

    }
  }
}
</script>

<style>
</style>