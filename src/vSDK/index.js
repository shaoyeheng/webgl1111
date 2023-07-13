/* eslint-disable no-unused-vars */
import Vue from "vue";
import {
	Button,
	Input
} from "element-ui";

import main from "./index.vue"
Vue.use(Button);
Vue.use(Input);


 import store from './store'
 import emitter  from './utils/bus';
// let vm

class vSDK {
	
	constructor(options, callback) {
		if (!vSDK.instance) {
			vSDK.render(options, callback);
			vSDK.instance = this;
		}
	}

	static render(options, callback) {
		if (options === void 0) {
			options = {
				el: "#app",
				appId: "",
				sceneX: "",
				serverIp: "",
				serverPort: 9001,
				ability: ['viewX'],
				cameraPosition: {x: 0.2, y: 0.5, z: 1},
				cameraLookAt: {x:0.31386015251500976, y: -0.8114158341501145,z: -0.49304781588982666 },
				showNavi: true,
				onSceneInited: Function,
				callback: Function,
			};
		}
		this.options = Object.assign({}, options);
		console.log(this.options)
		const el = this.options.el;
	    new Vue({
			render: (h) => h(main, {
				props: this.options
			}),
			store,
			props: {
				...options
			},
			//inject: ['handlerFinished'],
			mounted() {
				callback && callback();
			},
			methods: {
				gotoView(){
					//this.handlerFinished("login")
				}
			}
			 
		}).$mount(el);
	}

	static init(options, callback) {
		if (!this.instance) {
			this.instance = new vSDK(options, callback);
		}
		return this.instance;
	}
	
	static setAxes(visible){
		emitter.emit("setVisible",{
			meshName:"sysAxes",
			visible
		})
	}
	
	static setNaviBtnShow(visible){
		emitter.emit("setNaviBtnShow",{
			visible
		})
	}
	
	static setVisible(meshName, visible){
		emitter.emit("setVisible",{
			meshName,
			visible
		})
	}
	
	static setLayers(opType, layer){
		emitter.emit("setLayers",{
			opType,
			layer
		})
	}
	
	static setCameraPose(opType, parameter){
		emitter.emit("setCameraPose",{
			opType: opType,
			parameter: parameter
		})
	}
	
	static setCameraPosition(x, y, z, lookAtX, lookAtY, lookAtZ, callFunc){
		emitter.emit("setCameraPosition",{
			callFunc,
			position: {
				x: parseFloat(x),
				y: parseFloat(y),
				z: parseFloat(z)
				},
			lookAt: {
				x: parseFloat(lookAtX), 
				y: parseFloat(lookAtY), 
				z: parseFloat(lookAtZ)
				},
		})
	}
	 
    //cmd: start启动  suspend暂停-保留中断点 stop停止-清除状态  
	//tripWay: oneWay单程 backToOrigin返回原点
	static setCameraRoam(cmd, tripWay, lineName, lineStep, speedRate, callFunc){
		console.log("index ------------------")
		emitter.emit("setCameraRoam",{
			callFunc,
			lineName,
			speedRate,
			lineStep,
			cmd,
			tripWay
		})
	}
	
	static getVersion(){
		return "1.0.1"
	}
	
	static getCameraPose(callFunc){
		emitter.emit("getCameraPose",callFunc)
	}
	
	static gotoViewDemo(callFunc){
		//vm.handlerFinished("login")
		emitter.emit("handlerFinished","login")
		
		//vm.gotoView()
		callFunc && callFunc("func callback demo directly");
		setTimeout(() => {
			callFunc && callFunc("func callback demo delay3000");
		}, 3000);
		emitter.emit("mittcallback",this.funcDemo)
		emitter.emit("mittcallback2",{
			p1: "login",
			callFunc: callFunc
		})
	}
}

export default vSDK;
