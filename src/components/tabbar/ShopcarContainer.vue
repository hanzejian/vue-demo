<template>
  <div class="shoppercar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
            @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt />
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 问题：如何从购物车中获取商品的数量 -->
                <!-- 1.我们可以先创建一个空对象，然后循环购物车中所有商品的数据，把当前玄幻这条商品的 Id 
                    作为对象的属性名， count 值作为对象的属性值，这样，当把所有的商品循环一遍后，就会得到一个对象：
                    { 88: 2, 89: 1, 90: 4 } -->
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount["count"] }}</span> 件，
            总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount["amount"] }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
  data() {
    return {
      goodslist: [],  //购物车中所有商品的数据
    }
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 1.获取到 store 中所有的商品的 Id ，然后拼接出一个 用逗号分隔的 字符串
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      // 如果 购物车中没有商品 则直接返回，不需要请求数据接口，否则会报错
      if (idArr.length <= 0) {
        return;
      }
      // 获取购物车商品列表
      this.$http.get('api/goods/getshopcarlist/' + idArr.join(",")).then(result => {
        if(result.body.status === 0) {
          this.goodslist = result.body.message;
        }
      })
    },
    // 点击删除， 把商品从 store 中根据传递的 Id 删除，同时， 把当前组件中的goodslist中，对应要删除的那个
    //    商品用 index 来删除
    remove(id, index) {
      this.goodslist.splice(index, 1);
      this.$store.commit('removeFormCar', id);
    },

    // 每当点击开关，将最新的 开关状态 同步到 store 中
    selectedChanged(id, val) {
      this.$store.commit("updateGoodsSelected", { id, selected: val });
    },
  },
  components: {
    numbox
  },
};
</script>

<style lang='scss' scoped>
.shoppercar-container {
  background-color: #eee;
  overflow: hidden;

  .goods-list {

    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        display: felx;
        justify-content: space-between;

        .price {
          color: red;
          font-weight: bold;
        }
      }
    }
  }

  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .red{
      color: red;
      font-size: 16px;
      font-weight: bold
    }
  }
}
</style>