/*
vuex的actions模块
 */
import {reqAddress, reqCategory, reqShopStore,reqShopList,reqUsersInfo,reqLogout,reqShopGoods,reqShopInfo,reqShopRatings} from '../api'
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS,
  RECEIVE_SHOPLIST,SET_USER,RESET_USER,RECEIVE_GOODS,RECEIVE_INFO,RECEIVE_RATINGS} from './mutation-types'

export default {
  // 异步获取地址
  async getAddress({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    commit(RECEIVE_ADDRESS, {address: result.data})
  },
  // 异步获取分类列表
  async getCategory({commit}) {
    const result = await reqCategory()
    commit(RECEIVE_CATEGORYS, {categorys: result.data})
  },
  // 异步获取商家列表
  async getShops({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShopStore({latitude, longitude})
    commit(RECEIVE_SHOPS, {shops: result.data})
  },
  //根据经纬度和关键字异步获取商家列表
  async getShopList({commit,state}){
    const {keyword} = state;
    const geohash = state.latitude+','+state.longitude;
    const result = await reqShopList(keyword,geohash);
    commit(RECEIVE_SHOPLIST,{shoplist: result.data})
  },
  //保存用户信息
  setUser({commit},user){
    commit(SET_USER,{user})
  },
  //异步获取用户信息
  async getUserInfo({commit}){
    const result = await reqUsersInfo();
    if(result.code === 0) {
      commit(SET_USER, {user: result.data});
    }
  },
  //退出登录
  async getLogout({commit}){
    const result = await reqLogout();
    if(result.code === 0){
      commit(RESET_USER)
    }
  },
  //获取商家的商品信息
  async getShopGoods({commit},callback){  //如果你需要在获取数据之后执行回调函数，那么你可以给它加一个形参，然后判断如果有回调那就执行。
    const result = await reqShopGoods();
    if(result.code === 0){
      commit(RECEIVE_GOODS,{goods:result.data});
      if(callback){
        callback()
      };
    }
  },
  //获取商家评价
  async getShopRatings({commit}){
    const result = await reqShopRatings();
    if(result.code === 0){
      commit(RECEIVE_RATINGS,{ratings:result.data});
    }
  },
  //获取商家详情信息（这些是头部的信息）
  async getShopInfo({commit}){
    const result = await reqShopInfo();
    if(result.code === 0){
      commit(RECEIVE_INFO,{info:result.data});
    }
  }

}
