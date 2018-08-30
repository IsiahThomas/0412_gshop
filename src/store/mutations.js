import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_SHOPLIST,
  SET_USER,
  RESET_USER
} from './mutation-types'

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
  [RESET_USER](state){ //这里不传参的
    state.user = {};
  }
}
