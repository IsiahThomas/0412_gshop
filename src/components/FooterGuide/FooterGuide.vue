<template>
  <div class="footer">
    <a href="javascript:;" :class="{active: '/msite'===$route.path}" @click="goTo('/msite')">
      <span>
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </a>
    <a href="javascript:;" :class="{active: '/search'===$route.path}" @click="goTo('/search')">
      <span>
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </a>
    <a href="javascript:;" :class="{active: '/order'===$route.path}" @click="goTo('/order')">
      <span>
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" :class="{active: '/profile'===$route.path}" @click="goTo('/profile')">
      <span>
        <i class="iconfont icon-geren"></i>
      </span>
      <span>个人中心</span>
    </a>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    computed: {},
    methods: {
      goTo (path) {
        this.$router.replace(path)
      }
    }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  $t_c = #3da4ff
  .footer
    position fixed
    left 0
    bottom 0
    width 100%
    height 50px
    background-color white
    display flex
    &>a
      flex 1
      display flex
      flex-direction column
      align-items center
      justify-content center
      &.active
        color $t_c
      &>span
        .iconfont
          font-size 25px
      &>span:last-child
        font-size 12px
        margin-top 5px
</style>
