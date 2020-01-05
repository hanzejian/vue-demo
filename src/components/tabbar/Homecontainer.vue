<template>
  <div>
    <!-- 轮播图区域 -->
    <swiper :lunbotuList="swipeList" :isFull="true"></swiper>

    <!-- 九宫格区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="./../../images/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="./../../images/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="./../../images/menu4.png">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="./../../images/menu5.png">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="./../../images/menu6.png">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from '../subcomponents/swiper.vue'

export default {
  data() {
    return {
      swipeList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getSwipe();
  },
  methods: {
    getSwipe() {
      //获取轮播图数据的方法
      this.axios
        .get("api/getlunbo")
        .then(result => {
          if (result.data.status === 0) {
            //成功了
            this.swipeList = result.data.message;
          } else {
            //失败的
            Toast("加载轮播图失败");
          }
        });
    }
  },

  components: {
    swiper
  },
};
</script>

<style lang='scss' scoped>
.mui-grid-view.mui-grid-9{
  background-color: #fff;
  border: none;

  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body {
    font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;

}
</style>