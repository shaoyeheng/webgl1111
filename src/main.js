import Vue from 'vue'
import App from './App.vue'
import BaiduMap from 'vue-baidu-map'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index.js'
import PeachJoystick from 'peach-joystick'

Vue.config.productionTip = false

Vue.use(BaiduMap,{ak:'GA2U1BOpLG0GUPhAGutWPkDNG0dMme41'})
Vue.use(ElementUI);
Vue.use(PeachJoystick)

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
