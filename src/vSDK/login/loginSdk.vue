<template>
  <div>
	  <p style="height: 50px;"></p>
    <el-input v-model="input" placeholder="请输入账号"></el-input>

    <el-button class="countdown-button" @click="login">打开示例Demo</el-button>

  </div>
</template>

<script>
	import emitter from "../utils/bus";
export default {
  data () {
    return {
      input: '222s'
    }
  },
  props:{
	  modelX: ""
  },
  mounted() {
	  console.log(this.$store.state)
	  console.log(this.$store.getters.getAge)
	  console.log("model:"+this.modelX)
	  this.input = this.modelX
	  emitter.on("handlerFinished",data=>{
	  	console.log("sdsdsdlksjdf:"+data)
	  	this.input = "xxxdsds:"+data
		this.login()
	  	//this.handlerFinished(data)
	  })
  	//this.input = this.$store.state.name
  },
  methods:{
    login(){
		
      console.log("登录")
      this.$emit("curfinished",'login')
    }
  }
}
</script>