<template>
  <div class="newsinfo-container">
      <!-- 大标题 -->
      <h3 class="title">{{ newsinfo.title }}</h3>
      <!-- 子标题 -->
      <p class="subtitle">
          <span>发表时间：{{ newsinfo.add_time | dataFormat }}</span>
          <span>浏览次数：{{ newsinfo.click }}次</span>
      </p>

      <hr>
      <!-- 内容区域 -->
      <div class="content" v-html="newsinfo.content"></div>

      <!-- 评论区域 -->
      <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import comment from '../subcomponents/comment.vue'

export default {

    data() {
        return {
            id: this.$route.params.id,  //将 URL 地址中传递过来的 Id值，挂载到data上，方便以后调用
            newsinfo: [],
        }
    },
    created() {
        // 创建实例后调用调用
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo() {  //获取新闻详情
            this.axios.get('api/getnew/' + this.id).then(result => {
                if(result.data.status === 0) {
                    this.newsinfo = result.data.message[0];
                } else {
                    Toast("获取新闻失败！");
                }
            })
        }
    },
    components: { //用来注册子组件的节点
        'comment-box': comment

    }
}
</script>

<style lang="scss" scoped>
.newsinfo-container {
    padding: 0 4px;
    .title {
        font-size: 14px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle {
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    
    img {
        width: 100%;
    }
}
</style>