/*
vuex的actions模块
 */
import {reqAddress, reqCategory, reqShopStore} from '../api'
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS} from './mutation-types'

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
  }
}
