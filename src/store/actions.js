/*
vuex的actions模块
 */
import {reqAddress, reqCategory, reqShopStore,reqShopList,reqUsersInfo,reqLogout} from '../api'
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS,RECEIVE_SHOPLIST,SET_USER,RESET_USER} from './mutation-types'

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
  async getLogout({commit}){
    const result = await reqLogout();
    if(result.code === 0){
      commit(RESET_USER)
    }
  }
}
