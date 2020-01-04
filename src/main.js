// 入口文件
import Vue from 'vue'

// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由模块
Vue.use(VueRouter)
// 1.3 导入自己的 router/index.js 路由模块
import router from './router/index.js'

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
})



// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource) 
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置 post 时候表单数据格式组织格式  application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;


// 导入MUI的样式
import './lib/mui/css/mui.min.css'
// 底部购物车的图标用到的样式
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'


// 全部导入Mint-UI  (懒加载时候的小图标不能按需导入，所有要全部导入)
import MintUI from 'mint-ui'
Vue.use(MintUI)
// // 按需导入Mint UI中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
// // 一定要导入样式表，不然显示不了样式
import'mint-ui/lib/style.css'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);

// 安装图片预览插件
// import VuePreview from 'vue-preview'
// Vue.use(VuePreview)

// 导入 vuex 并注册
import store from "./store/index.js"
// 每次刚进入网站，肯定会调用 main.js 在刚调用的时候，先从本地村相互中，把购物车的数据读出来
// 每次刷新页面，取得 localStorage  中的 car 数据，使购物车保存上次的数据
store.state.car = JSON.parse(localStorage.getItem('car') || '[]')




// 安装图片预览插件,并导入样式表
import Viewer from 'v-viewer'
Vue.use(Viewer)
import 'viewerjs/dist/viewer.css'





// 导入App组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c=> c(app),
  router, //1.4 挂载路由对象到 vm 实例上 
  store,  //将 vuex 创建爱你的 store 挂载到 VM 实例上， 只要挂载到了 vm 上， 任何组件都能使用store 来存取数据
})