<template>
  <section>
    <div class="headers">
      <a href="javascript:;">
        <span><i class="iconfont icon-sousuo"></i></span>
      </a>
      <span>{{address.name}}</span>
      <span class="spana"><a href="javascript:;" style="color: white;">登录</a><span style="color: white;font-size: 15px">|</span><a href="javascript:;" style="color:white">注册</a></span>
    </div>
    <div class="footers">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(big,index) in categoryArrs" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(small,index) in big" :key="index">
              <div class="food_container">
                <img :src="imgBaseUrl+small.image_url">
              </div>
              <span>{{small.title}}</span>
            </a>
          </div>
          <!--<div class="swiper-slide">
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/9.jpg">
              </div>
              <span>甜品饮品</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/10.jpg">
              </div>
              <span>商超便利</span>
            </a>
            <a href="javascript:" class="link_to_food con3">
              <div class="food_container">
                <img src="./images/nav/11.jpg">
              </div>
              <span>美食</span>
            </a>
            <a href="javascript:" class="link_to_food con3">
              <div class="food_container">
                <img src="./images/nav/12.jpg">
              </div>
              <span>简餐</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/13.jpg">
              </div>
              <span>新店特惠</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/14.jpg">
              </div>
              <span>准时达</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/1.jpg">
              </div>
              <span>预订早餐</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/2.jpg">
              </div>
              <span>土豪推荐</span>
            </a>
          </div>-->
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="line"></div>
      <ShopList/>
    </div>
  </section>
</template>
<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import '../../../static/css/swiper.min.css'
  import ShopList from '../../components/ShopList/ShopList.vue'
  export default {
    data() {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },

    computed: {
      ...mapState(['address','categorys']), //把从state中获取来的属性放到计算属性中
      categoryArrs(){
        var max = 8;
        var bigArr = []; //那两个轮播页。
        let {categorys} = this;
        var smallArr = []//每一个小标签。
        categorys.forEach((e,index)=>{
          if(smallArr.length === 0){
            bigArr.push(smallArr);
          }
          smallArr.push(e);
          if(smallArr.length === max){
            smallArr = [];
          }
        })
        return bigArr;
      }
    },
    methods: {},

    mounted(){
      this.$store.dispatch('getAddress');//指定想要的action(dispatch一个action)
      this.$store.dispatch('getCategory');//获取轮播分类

      this.$store.dispatch('getShopList');//根据关键字获取商家列表（暂时先写在这儿）
    }
    ,components:{
      ShopList
    },
    watch:{
      categorys(){
        /*写这个nextTick方法的原因就是想让下面的小圆点在轮播图片页加载完之后再出来*/
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',
            },
            loop: true
          })
        })
    }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  section
    position absolute
    left 0
    top 0
    width 100%
    &>.headers
      width 100%
      height 40px
      background-color #3da4ff
      &>a:first-child
        line-height 40px
      &>span
      .iconfont
        font-size 25px
        color white
        float left
        margin-left 20px
      &>span:nth-child(2)
        width 100px
        display inline-block
        font-size 23px
        color white
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        margin-left 90px
        margin-top 10px
      &>.spana
        position fixed
        top 14px
        right 10px
        font-size 15px

    &>.middlecontent
      line-height 40px
      text-align center
    &>.footers
      display flex
      position relative
      & .link_to_food
        width 25%
        float left
        text-align center
      & .food_container img
        width 60%
        height 60%
      & .swiper-wrapper
        padding-bottom 38px
      & .line
        position absolute
        left 0
        top 100%
        background-color #dddddd
        width 100%
        height 15px

</style>
