// 引入vue
import Vue from 'vue';
// 引入vue-router
import VueRouter from 'vue-router';
// 注册 第三方库需要use一下才能用
Vue.use(VueRouter)
// 引入HelloWorld页面
import bdmap from '../components/bdmap.vue'

import earthmap from '../components/earthmap.vue'

import ehmap1 from '../components/ehmap.vue'

import ehmap2 from '../components/ehmap2.vue'

import sceneRenderer from '../pages/sceneRenderer.vue'


// 定义routes路由的集合，数组类型
const routes=[
    //单个路由均为对象类型，path代表的是路径，component代表组件
    {path:'/bdmap',component:bdmap},
    {path:"/earthmap",component:earthmap},
    {path:"/ehmap1",component:ehmap1},
    {path:"/ehmap2",component:ehmap2},
    {path:"/sceneRenderer",component:sceneRenderer}
]

// 实例化VueRouter并将routes添加进去
const router = new VueRouter({
// ES6简写，等于routes：routes
    routes
});

// 抛出这个这个实例对象方便外部读取以及访问
export default router
