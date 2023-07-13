import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import * as THREE from 'three'

export default new Vuex.Store({
	state: {
		name: "tom",
		age: 22,
		meshMap: new THREE.Object3D(),
	},
	getters: {
		getName: (state) => state.name,
		getAge: (state) => state.age,
	},
	mutations: {	
		setName: (state,data) => state.name = data,
		setAge: (state,data) => state.age = data,
	},
	//异步操作mutation
	actions: {
		acSetName(context,name){
			setTimeout(() => {
				context.commit("setName",name);
			},1000);
		}
	},
	modules: {
		
	}
})