<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>

    <hr>

    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},   //图文数据
      id: this.$route.params.id,
    }
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.axios.get('api/goods/getdesc/' + this.id).then(result => {
        if (result.data.status === 0) {
          this.info = result.data.message[0];
        }
      })
    }
  }
}
</script>

// 当图片显示乱排时， 把scoped去掉
<style lang="scss">
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content{
    img {
      width: 100%;
    }
  }
}
</style>