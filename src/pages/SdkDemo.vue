<template>
	<div class="viewer-main">
		<div id="vsdk" v-if="true"></div>
		<div class="op-div">

			<el-switch
			  v-model="flag"
			  active-color="#13ce66"
			  inactive-color="#ff4949">
			</el-switch>
			
			<el-radio-group v-model="labelPosition" size="mini" v-show="false">
			  <el-radio-button label="left">左对齐</el-radio-button>
			  <el-radio-button label="right">右对齐</el-radio-button>
			  <el-radio-button label="top">顶部对齐</el-radio-button>
			</el-radio-group>
			<div style="margin: 5px;"></div>
			<el-form :label-position="labelPosition" label-width="80px" :model="optionParameter" @submit.native.prevent v-show="flag" size="mini">
			   <el-divider content-position="left" size="mini">渲染控制</el-divider>
			  <el-form-item label="辅助坐标">
				  <el-switch v-model="optionParameter.sysAxes" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
			  </el-form-item>
			  <el-form-item label="辅助网格">
			    <el-switch v-model="optionParameter.sysGrid" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
			  </el-form-item>
			  <el-form-item label="预设按钮">
			    <el-switch v-model="optionParameter.naviBtn" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
			  </el-form-item>
			  <el-form-item label="图层设置">
				  <el-col class="line" :span="3">图层</el-col>  
				   <el-col :span="8">
				  <el-select v-model="optionParameter.layer" placeholder="请选择"  filterable>
				  	<el-option v-for="item in 32" :key="item-1" :label="item-1" :value="item-1">
				  	</el-option>
				  </el-select>
				  </el-col>
				  <el-col class="line" :span="3">操作</el-col>  
				   <el-col :span="10">
					   <el-select v-model="optionParameter.opType" placeholder="请选择"  filterable>
							<el-option v-for="item in ['toggle','enable','disable','enableAll','disableAll','set']" :key="item" :label="item" :value="item">
							</el-option>
					   </el-select>
				   </el-col>
			  </el-form-item>	  
			  <el-form-item>
				  <el-button type="primary" @click="onSubmit" size="mini">重新渲染</el-button>
				</el-form-item>
			  <el-divider content-position="left">空间位置转换</el-divider>
				<el-form-item label="相机位置">
					 <el-col class="line" :span="1">x</el-col>  
					 <el-col :span="7">
						<el-input v-model="optionParameter.x"></el-input>
					</el-col>
					  <el-col class="line" :span="1">y</el-col>  
					 <el-col :span="7">
						 <el-input v-model="optionParameter.y"></el-input>
					  </el-col>
					   <el-col class="line" :span="1">z</el-col> 
					  <el-col :span="7">
						  <el-input v-model="optionParameter.z"></el-input>
					   </el-col>
				</el-form-item>
			  <el-form-item label="朝向矢量">
				 <el-col class="line" :span="1">x</el-col>
				 <el-col :span="7">
					<el-input v-model="optionParameter.lookAtX"></el-input>
				</el-col>
				 <el-col class="line" :span="1">y</el-col>
				 <el-col :span="7">
					 <el-input v-model="optionParameter.lookAtY"></el-input>
				  </el-col>
				  <el-col class="line" :span="1">z</el-col> 
				  <el-col :span="7">
					  <el-input v-model="optionParameter.lookAtZ"></el-input>
				   </el-col>
			  </el-form-item>
			   
				<el-form-item>
				  <el-button type="primary" @click="setCameraPosition" size="mini">确认跳转</el-button>
				</el-form-item>
			  <el-divider content-position="left">操作模拟</el-divider>
			  <el-form-item label="路线漫游">
				   <el-col :span="12">
					   <el-input v-model="optionParameter.lineName" placeholder="路线编号"></el-input>
				   </el-col>
				   <el-col :span="6">
				   		<el-input v-model="optionParameter.speedRate" placeholder="速率"></el-input>
				   </el-col>
				  <el-col :span="6">
						<el-input v-model="optionParameter.lineStep" placeholder="步数"></el-input>
				  </el-col>
				   
				  
				   </el-form-item>
				   <el-form-item label="">  
				   <el-col :span="8">
				   
							<el-select v-model="optionParameter.tripWay" placeholder="请选择"  filterable>
								<el-option v-for="item in ['oneWay','backToOrigin']" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>
				   </el-col>
				   <el-col :span="8">
				   
					   <el-select v-model="optionParameter.cmd" placeholder="请选择"  filterable>
							<el-option v-for="item in ['start','suspend','stop']" :key="item" :label="item" :value="item">
							</el-option>
					   </el-select>
				   </el-col>
				   
				  <el-col :span="4">
					<el-button type="primary" @click="setCameraRoam" size="mini">执行漫游命令</el-button>
				  </el-col>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import vSDK from "@/vSDK/index.js"
	import * as THREE from 'three'
	import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
	import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'


	export default {
		name:"about",
		props: {
			msg: String
		},
		 
		data() {
			return{
				msgx:"",
				filters: {
					aid: 0
				},
				xid:1,
				model:'fox',
				drawer: false,
				direction: 'rtl',
				labelPosition: 'left',
				optionParameter: {
				  sysAxes: false,
				  sysGrid: false,
				  naviBtn: false,
				  opType: "enableAll",
				  layer: 0,
				  name: '',
				  region: '',
				  type: '',
				  x:-5.57,
				  y:14.40,
				  z:8.75,
				  lookAtX: 0.31386015251500976,
				  lookAtY: -0.8114158341501145,
				  lookAtZ: -0.49304781588982666,
				  cmd: "start",
				  tripWay: "oneWay", lineName: "", speedRate: 0.001,lineStep: 500,
				},
				flag: true,
			}
		},
		methods: {
		 
		 setCameraPosition(){
			vSDK.setCameraPosition(this.optionParameter.x, this.optionParameter.y, this.optionParameter.z, this.optionParameter.lookAtX,this.optionParameter.lookAtY,this.optionParameter.lookAtZ)
		  },
		  setCameraRoam(){
			  vSDK.getCameraPose(data=>{
				  console.log(data)
			  })
			  vSDK.setCameraRoam(this.optionParameter.cmd,this.optionParameter.tripWay, this.optionParameter.lineName, this.optionParameter.speedRate,this.optionParameter.lineStep,(res)=>{
				  console.log(res)
				  if(res.code = 105){
					  this.$message.error(res.msg);
				  }
			  })
		  },
		  onSubmit(){
			  vSDK.setAxes(this.optionParameter.sysAxes)
			  vSDK.setVisible("sysGrid",this.optionParameter.sysGrid)
			  vSDK.setNaviBtnShow(this.optionParameter.naviBtn)
			  vSDK.setLayers(this.optionParameter.opType, this.optionParameter.layer)
			  
		  },
		  handleClose(done) {
			this.$confirm('确认关闭？')
			  .then(_ => {
				//done();
				this.drawer = false;
			  })
			  .catch(_ => {});
		  },
		  onSceneInited(scene, camera){
			  console.log("on scene inited.")
			  const loader = new FBXLoader();
			  loader.load(`model/fbxfile.fbx`, object => {
			      console.log(object, 'fbx object----->>>')
			      object.traverse(child => {
			        if ( child.isMesh ){
			          child.castShadow = true;
			          child.receiveShadow = true;
					  child.material.emissive = child.material.color
					  child.material.emissiveMap = child.material.map
			        }
			      });
				  object.scale.multiplyScalar(0.01)
			      scene.add(object);
			    })
				const objLoader = new OBJLoader();
				objLoader.load('model/3dxy.com.obj', (obj) => {
					console.log(obj, 'obj----->>>')
					let boundingBox = new THREE.Box3().setFromObject(obj);
					let size = new THREE.Vector3();
					boundingBox.getSize(size);
					console.log(size, 'boundingBox size ------- >>>')
					
					//const scale = cameraDistance / size.length();
					let scale = 10
					obj.scale.multiplyScalar(0.01)
					//obj.scale.set(scale, scale, scale);
					
				    scene.add(obj)
				 })
				
				
		  },
		  
		},
		
		created() {

		},
		mounted() {

			vSDK.init({
			   el: "#vsdk",
			   //ability: ['viewX'],
			   sceneX: "LMC",
			   //serverIp: location.host.split(':')[0],
			   serverIp: "36.7.84.249",
			   //serverIp: "192.168.21.80",
			   serverPort: 9091,
			   cameraPosition: {x: -5.57, y: 14.40, z: 8.75},
			   cameraLookAt: {x:0.31386015251500976, y: -0.8114158341501145,z: -0.49304781588982666 },
			   onSceneInited: this.onSceneInited,
			   callback: function (evt) {
			     console.log('回调方法执行.')
				 console.log(evt)
			   }
			 },
			 function () {
				console.log("初始化完成.");
			})
			console.log(vSDK.getVersion())

			setTimeout(() => {
				vSDK.gotoViewDemo(ret=>{
					console.log(ret)
				})
				vSDK.setCameraPose("parameterA","parameterB")
			}, 3000);
		},
		computed: {
			name(){
				return this.$store.getters.getAge
			},
	
			 //mapState(["name", "age"]),
			// mapGetters(["getName","getAge"])
		},
		
	}
</script>

<style scoped>
	.viewer-main {
		width: 100%;
		height: 100%;
		z-index: 3;
	}
	.op-div {
		width: 360px;
		padding: 20px;
		border: 0.5px solid #99999988 ;
		background-color: #ffffff98 ;
		position: absolute;
		z-index: 4;
		top: 5px;
		right: 5px;
	}
</style>