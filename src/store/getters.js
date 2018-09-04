/*包含多个基于state的getters计算属性的*/
export default {
  //购物车中商品的总数
  totalCount(state){
    return state.cartFoods.length;
  },
  //购物车中商品的总价
  totalPrice(state){
    return state.cartFoods.reduce((proTotal,food)=>proTotal+food.price*food.count,0);
  }
}
