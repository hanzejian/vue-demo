import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from '../components/tabbar/Homecontainer'
import MemberContainer from '../components/tabbar/MemberContainer'
import ShopcarContainer from '../components/tabbar/ShopcarContainer'
import SearchContainer from '../components/tabbar/SearchContainer'
import NewsList from '../components/news/NewsList'
import NewsInfo from '../components/news/NewsInfo'
import PhotoList from '../components/photos/PhotoList'


// 创建路由对象
var router = new VueRouter({
  mode: "history",
  routes: [//配置路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newsList', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo},
    { path: '/home/photolist', component: PhotoList }
  ],
  linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类,默认的类叫做router-link-active
})

// 把路由对象暴露出去
export default router
