<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在组件中，用v-for循环的话，一定要使用 v-key -->
      <!-- 将来，谁使用 轮播图组件， 谁为我们传递 lunbotuList -->
      <!-- 此时， lunbotuList 应该是 父组件向子组件传值来设置 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" :class="{full: isFull}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
  <!-- 分析： 为什么 商品评论中的 轮播图那么丑 -->
  <!-- 1. 首页中的图片， 它的宽和高， 都是使用了 100% 的宽度 -->
  <!-- 2. 在商品详情页面中， 轮播图的图片， 如果也使用困高为100%的话，页面不好看 -->
  <!-- 3. 商品详情页面中的轮播图， 期望高度是100%， 但是宽度为自适应 -->
  <!-- 4. 经过分析，得到回复的原因： 首页中的轮播图 和详情中的轮播图， 分歧点是 宽度到底是100%还是自适应 -->
  <!-- 5. 定义一个属性，让使用轮播图的调用者手动指定是否为100%的高度 -->
</template>

<script>
export default {
  props: ["lunbotuList", "isFull"]
}
</script>

<style lang="scss" scoped>
// 轮播图需要手动设置高度
.mint-swipe {
  height: 200px;
  
  .mint-swipe-item {
    text-align: center;
    
    img {
      height: 100%;
    }
  }
}

.full {
  width: 100%;
}
</style>