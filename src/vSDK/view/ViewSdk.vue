<template>
  <div>
	<Viewer :sceneX="sceneX" :cameraPosition="cameraPosition" :serverIp="serverIp" :serverPort="serverPort" :showNavi="showNavi"></Viewer>
    <el-button @click="finishedAuth" v-show="false">实名完成</el-button>
  </div>
</template>

<script>
	import Viewer from "./Viewer.vue"
	export default {
		name:"viewX",
		data() {
			return {
				model1: "fox",
				showNavi: true,
			}
		},
		 props:{
		 	  sceneX: String,
			  cameraPosition: Object,
			  serverIp: String,
			  serverPort: Number,
		 },
		components:{
			Viewer,
		},
	  methods: {
		finishedAuth () {
		  this.$emit('curfinished', 'auth')
		}
	  }
	}
</script>
