<template>
  <div class="app-container">
    <!-- 顶部Header区域 -->
    <mt-header fixed title="vue-demo"></mt-header>
    
    <!-- 组件切换的动画 -->
    <transition>
      <!-- 中间的路由router-view区域 -->
      <router-view></router-view>
    </transition>

    <!-- 底部Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
      <!-- 因 .mui-tab-item 类名与 Photo.vue 中引入的 mui 中的类名重合，所以改名为 .mui-tab-item-hzj -->
      <router-link class="mui-tab-item-hzj" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-hzj" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-hzj" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-hzj" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
      
    </nav>
  </div>
</template>
<script>
export default {

}
</script>

<style lang="scss" scoped>
.mint-header {
  z-index: 99;
}
.app-container {
  padding-top: 40px;
  // 解决切换时出现的滚动条
  // 不能加 overflow-y 不然以后页面不能滚动
  overflow-x: hidden;
  padding-bottom: 50px;
}

// 动画进入前的位置
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
// 动画离开后的位置
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

// 改类名，解决 tabbar 无法切换的问题
.mui-bar-tab .mui-tab-item-hzj.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-hzj {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-hzj .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-hzj .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
