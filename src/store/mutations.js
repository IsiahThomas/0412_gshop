import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_SHOPLIST,
  SET_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_GOODSCOUNT,
  EDD_GOODSCOUNT
} from './mutation-types'

import Vue from 'vue'
export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_SHOPLIST](state,{shoplist}){
    state.shoplist = shoplist
  },
  [SET_USER](state,{user}){
    state.user = user;
  },
  [RESET_USER](state){ //这里不传参的,因为登出的作用就是重置user
    state.user = {};
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods;
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings;
  },
  [RECEIVE_INFO](state,{info}){
    state.info = info;
  },

  [ADD_GOODSCOUNT](state,{food}){
    if(food.count){
      food.count++;
    }else if(!food.count){
      Vue.set(food,'count',1);// 新增属性必须要通过set来设置数据绑定。
      state.cartFoods.push(food);
    }
  },
  [EDD_GOODSCOUNT](state,{food}){
    if(food.count) {
      food.count--;
    }
  }
}
