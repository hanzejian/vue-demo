# 由vue-cli3构建的项目

## 制作首页 APP

    1.完成Header区域，使用的是Mint-UI种的Header组件
    2.制作底部的Tabbar区域， 使用的是MUI的Tabbar.html
        + 在制作 购物车 小图标的时候，操作会相对多一些：
        + 先把 扩展图标的 css样式， 拷贝到项目中
        + 拷贝扩展字体库 ttf 文件到项目中
        + 为 购物车 小图标， 添加如下样式 'mui-icon mui-icon-extra mui-icon-extra-cart'
    3.要在中间区域放置一个 router-view 来展示路由匹配的组件

## 改造 tabbar 为router-link

## 设置路由高亮

    1.把默认类 linkActiveClass 替换成 mui-active（由mui提供的类名）

## 点击 tabbar 中的路由链接， 展示对应的路由组件

    1. 设置路由规则
    2. 注意：把'/' 重定向到'/home'  例子：{ path: '/', redirect: '/home' }

### 组件切换的动画效果

    注意：<transition mode="out-in"> 会等组件完全离开后再进入新的组件 时间有点长，这里选用position解决动画出入问题
    1. 给切换区域套上<transition>标签
    2. 解决 Header和tabbar 滑动问题： #app-container{overflow-x: hidden}
    3. 解决右进左出问题： 设置 .v-enter 和 .v-leave-to
    4. 解决切换顺序问题： .v-leave-to { position: absolute }

## 制作Homecontainer组件

### 制作首页轮播图布局

    1. 引入Mint-UI中的 JS Component中的 Swipe组件
    2. 需要手动添加高度
    3. 需要手动添加背景图

### 加载首页轮播图数据

    1. 获取数据，使用 vue-resource
    2. 使用 vue-resource 的 this.$http.get 获取数据
    3. 获取到的数据，要保存到 data 身上
    4. 使用 v-for 循环渲染 每个 item 项
    5. 设置图片大小

### 轮播图下面的网格内容

    1. 导入 MUI 里的 grid-default.html 的代码片段
    2. 要改写样式，修改背景色和去除边框，可以直接复制类名重写属性
    3. 把图片放入 images 文件夹中
    4. 修改图片大小

### 改造新闻资讯路由链接

### 新闻资讯 页面制作

    1. 绘制页面，使用 MUI 中的 media-list.html
    2. 使用 vue-resource 获取数据
    3. 渲染真实数据

### 实现 新闻资讯列表 点击跳转到新闻详情

    1. 把列表中的每一项改造为 router-link 同时，在跳转的时候应该提供唯一的id标识符
    2. 创建新闻详情的组件项 NewsInfo.vue
    3. 在 路由模块中 将新闻详情的 路由地址 和 组件页面对应起来

### 实现 新闻详情 的 页面布局 和数据渲染

### 单独封装一个 comment.vue 评论子组件

    1. 先创建一个 单独的comment.vue 组件模板
    2. 在需要使用 comment 组件的页面中， 先手动导入 comment组件
        + ' import component from './comment.vue' '
    3. 在父组件中， 使用 'components'属性， 将刚才导入 comment 组件， 注册为自己的 子组件
    4. 将注册子组件时候的， 注册名称， 以标签形式， 在页面中 引用即可

### 获取所有的评论数据显示在页面中

    getComments

### 实现点击加载更多评论的功能

    1. 为加载更多按钮， 绑定点击事件，在事件中， 请求下一页数据
    2. 点击加载更多 让pageIndex++, 然后重新调用 this.getComments()方法重新获取最新一页的数据
    3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取新数据， 应该让老数据调用数据的cancat方法， 拼接上新数组

### 发表评论

    1. 把文本框做双向数据绑定
    2. 为发表按钮绑定一个事件
    3. 校验评论内容是否为空， 如果为空，则 Toast 提示用户  评论内容不能为空
    4. 通过 vue-resource 发送一个请求， 把评论内容提交给服务器
    5. 当发表评论OK后， 重新刷新列表， 以查看最新的评论
      + 如果调用 getComments 方法重新刷新评论列表的话， 可能只能得到最后一页的评论，前几页的评论获取不到
      + 换一种思路： 当评论成功后，在客户端，手动拼接处一个 最新的评论对象，然后调用数组的 unshift 方法， 把最新的评论，追加到 data 中 comments 的开头；这样就能完美实现刷新评论列表的需求

### 改造图片分析 按钮为 路由的连接并显示对应的组件页面

### 绘制图片列表 组件页面结构并美化样式

    1. 制作 顶部的滑动条
        + MUI 里的 tab-top-webview-main.html
        + 需要把 slider 区域的 mui-fullscreen 去掉
        + 滑动条无法正常触发滑动，通过检查官方文档，发现是个JS组件，需要被初始化一下
            + 1.导入 mui.js
            + 2.调用官方提供的方式去初始化
            mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        + 我们在初始化滑动条的时候，导入的 mui.js ，控制台报错，可能是mui.js用到了'caller','callee',和'arguments' 东西，但是webpack打包好的 bundle.js 中，默认是启用严格模式
        + 解决方案：把webpack打包时候的严格模式禁用掉 ：使用插件 babel-plugin-transform-remove-strict-mode
        +刚进入图片分析页面时，滑动条无法正常工作，如果要初始化滑动条，必须等 DOM 元素加载完毕，使用吧初始化滑动条的代码搬到 mounted 生命周期函数中
        + 当滑动条 调试OK后发现， tabbar 无法正常工作了， 这时候， 我们需要把每个 tabbar 按钮的样式中 'mui-tab-item' 重新改一下名字


    2. 制作 底部的图片列表
