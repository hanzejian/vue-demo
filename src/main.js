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

// 安装图片预览插件
import Viewer from 'v-viewer'
Vue.use(Viewer)
import 'viewerjs/dist/viewer.css'




// 导入App组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c=> c(app),
  router, //1.4 挂载路由对象到 vm 实例上 
})