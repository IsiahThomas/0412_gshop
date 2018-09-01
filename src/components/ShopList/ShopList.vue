<template>
  <div class="foots">
    <div class="footsheader">
      <span class="iconchoose"><i class="iconfont icon-xuanxiang"></i></span>
      <span class="fontchoose">附近商家</span>
    </div>
    <div class="footsfooter">
      <ul>
        <li v-for="(p,index) in shops" :key="index" @click="$router.push('/shop')">
          <div class="mainimg">
            <img :src=imgBaseUrl+p.image_path>
          </div>
          <div class="mainright">
            <ul>
              <li>
                <div class="mainrightone">
                  <div>
                    <span class="pinback">品牌</span>
                    <span class="fontback">{{p.name}}</span>
                    <span class="backfont" v-for="(c,index) in p.supports">{{c.icon_name}}</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="mainrighttwo">
                  <div>
                    <Star :score="p.rating" :size="24"/>
                    <span style="color: orangered" class="rating">{{p.rating}}</span>
                    <span class="fontsback">月售{{p.recent_order_num}}单</span>
                    <span class="backfonts ">准时达</span>
                    <span class="backfonts colorback">蜂鸟直送</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="mainrightthree">
                  <span style="font-size: 12px">{{p.float_minimum_order_amount}}元/{{p.piecewise_agent_fee.tips}}</span>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import Star from '../../components/Star/Star.vue'
  export default {
    data() {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },
    computed: {
      ...mapState(['shops'])     //mapState或者mapGetters获取的属性都放在这
    },
    methods: {
    },
    mounted(){
      this.$store.dispatch('getShops');
    },
    components:{
      Star
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .foots
    position absolute
    left 0
    top 101%
    width 100%
    height 500px
    &>.footsheader
      position absolute
      left 0
      top 0
      width 100%
      height 30px
      &>.iconchoose
        position absolute
        left 2%
        top 55%
        &>.iconfont
          color #dddddd
      &>.fontchoose
        margin-left -250px
        line-height 50px
        color #dddddd
    &>.footsfooter
      width 100%
      & ul
        margin-left 20px
        margin-top 40px
      & li
        margin-top 20px
        &::after
          content ''
          display block
          clear both
      & .mainimg
        float left
        width 71px
        &>img
          width 90%
      & .pinback
        display inline-block
        background-color #3da4ff
        width 30px
        text-align center
        font-size 12px
        float left
        margin-top 4px
      & .mainright
        position relative
        float right
        width 80%
        height 63px

        & .mainrightone
          width 100%
          position absolute
          left 0
          top 0

      & .fontback
        line-height 22px
      & .backfont
        float right
        display inline-block
        background-color white
        width 22px
        text-align center
        font-size 12px
        margin-left 5px
        margin-top 5px
        color #dddddd
      .mainrighttwo
        width 100%
        height 20px
        position absolute
        left 0
        top 22px

        .star-item
          display inline-block
          width 10px
          height 10px
          background-repeat no-repeat
          background-size 10px 10px
        .on
          background-image url("./images/stars/star24_on@2x.png")
        .half
          background-image url("./images/stars/star24_half@2x.png")
        .off
          background-image url("./images/stars/star24_off@2x.png")
        .fontsback
          font-size 12px
        .backfonts
          float right
          display inline-block
          background-color white
          width 50px
          text-align center
          font-size 10px
          margin-left -1px
          margin-top 5px
          color #3da4ff
          border 1px solid #3da4ff
        .colorback
          background-color #3da4ff
          color white
      .mainrightthree
        width 100%
        height 20px
        position absolute
        left -88px
        top 43px

</style>
