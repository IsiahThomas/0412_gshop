<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(sc,index) in scs" :class="sc" :key="index"></span>
    <!--从数组中遍历得到对应的类名，然后放进去,
         这个数组中添加什么东西是根据评分来的,所以要想到这个数组是一个计算属性-->
  </div>
</template>
<script>
  export default {
    props:['score','size'],//我在这个组件中会用到评分和图片尺寸，而这些东西都要从父组件传过来
    data() {
      return {}
    },
    computed: {
      scs(){
        const {score} = this;
        let scs = [];
        let Fscore = Math.floor(score);
        for (var i = 0; i < Fscore; i++) {
          scs.push('on');
        }
        if(score-Fscore>0.5){
          scs.push('half');
        }
        else{
          scs.push('off');
        }
        return scs;
      }
    },
    methods: {
    }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>

