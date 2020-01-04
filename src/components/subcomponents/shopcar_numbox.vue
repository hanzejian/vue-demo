<template>
<!-- 问题：我们不知道什么时候能够拿到 max 值，但是，总归有一刻， 会得到一个真正的max值 -->
<!-- 我们可以使用 watch 属性监听 来监听 父组件传递过来的max值， 不管 watch 会被触发几次，
但是，最后一次，肯定是一个合法的 max 数值 -->
  <div class="mui-numbox" data-numbox-min="1" style="height: 25px;" >
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChange" ref="numbox" readOnly/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChange() {
      // 数量改变了
      // 每当数量值改变，则立即把最新的数量同步到 购物车的 store 中， 覆盖之前的数量值
      this.$store.commit("updateGoodsInfo", {
        id: this.goodsid,
        count: this.$refs.numbox.value
      });
    },
  },
  props: ["initcount", "goodsid"],

}
</script>

<style lang="scss" scoped>

</style>