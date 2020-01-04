import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 每次刚进入网站，肯定会调用 main.js 在刚调用的时候，先从本地村相互中，把购物车的数据读出来


export default new Vuex.Store({
  state: {
    // state 相当于组件中的 data ，专门用来存储数据的
    // 如果在组件中， 想要访问 store 中的数据，只能通过 this.$store.state.prop
    car: [], //将购物车中的商品的数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象
    // 将对象设计成 { id:商品的id, count: 要购买的数量， price: 商品的单价， selected: false }
  },
  mutations: {
    // 修改 state 中的数据只能在 mutations 中
    addToCar(state, goodsinfo) {
      // 点击加入购物车，把商品信息，保存到 store 中的 car 上
      // 分析：
      // 1.如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
      // 2.如果没有，则直接把 商品数据， push 到 car 中即可

      // 假设 在购物车中没有找到对应的商品
      var flag = false;

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      })

      // 如果最终， 循环完毕， 得到的 flag 还是 false,则把商品数据直接 push 到 car 中
      if (!flag) {
        state.car.push(goodsinfo)
      }

      // 当更新 car 之后， 把 car 数组， 存储到本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },

    // 修改购物车中商品的数量值
    updateGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true;
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },

    // 根据 Id ，从 store 中的购物车中删除对应的那条商品数据
    removeFormCar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1);
          return true;
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car));
    },

    // 更新购物车商品的状态
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected;
        }
      })

      // 把最新的 所有购物车商品的状态保存到 store 中
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: { //this.$store.getters.***
    // 相当于 计算属性，也相当于 filter
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      })
      return c;
    },
    getGoodsCount(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      })
      return o;
    },

    // 得到选中的商品
    getGoodsSelected(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o;
    },

    // 得到总数和总额
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0,   //勾选的数量
        amount: 0,  //勾选的总价
      };
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count;
          o.amount += item.price * item.count;
        }
      })
      return o;
    },
  },
  actions: {},
  modules: {}
})

// 总结：
// 1.state 中的数据，不能直接修改，如果想要修改，必须通过 mutations
// 2.如果用组件想要直接从 state 上获取数据：需要用 this.$store.state.***
// 3.如果组件想要修改数据。必须使用 mutations 提供的方法，需要通过 
//    this.$store.commit('方法的名称'，唯一的一个参数)
// 4.如果 store 中 state 上的数据，在对外提供的时候，需要做一层包装，那么，
//    推荐使用 getters,如果需要使用 getters 则用 this.$store.getters.***