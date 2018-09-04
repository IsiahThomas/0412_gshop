<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="menuUl">
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
             :class="{current: currentIndex === index}" @click="handleClick(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="goodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index" >
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </div>
    <Food :food="food" ref="food"/>
    <ShopCart/>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import Bscroll from 'better-scroll'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../pages/Shop/ShopCart/ShopCart.vue'
  export default {
    data() {
      return {
        scrollY:0,
        tops:[],
        food:{}  //这个东西是点击谁就显示谁，所以开始没点击之前是没有值得，所以定义为空数组为好
      }
    },components:{
      CartControl,
      Food,
      ShopCart
    },
    computed: {
      ...mapState(['goods']),
      currentIndex(){//这个计算属性是根据scrollY和tops值共同确定的，就是判断左侧列表当前显示哪个标签的这么一个量
        console.log(this.tops,Array.isArray(this.tops) );  //this.tops instanceof Array
        let {scrollY,tops} = this;
        const index = tops.findIndex((top,index)=>//当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
          scrollY >= top && scrollY < tops[index+1] //当前这个scrollY介于当前top和下一个top之间，此时获取这个index.
        //如果语句只有一句千万不要加花括号，如果你加了那么一定要加 return。
        )
        return index;
      }
    },
    methods: {
     /*_initScroll(){
       new Bscroll('.menu-wrapper',{
         click:true
       });
       new Bscroll('.foods-wrapper')
     },*/
      //初始化右侧列表的tops值。
     _initTops(){
        const tops = [];
        let top = 0;
        tops.push(top);
        let lis = this.$refs.goodsUl.getElementsByClassName('food-list-hook');
        Array.from(lis).forEach((li,index)=>{
          top+=li.clientHeight;
          tops.push(top);
        })
        this.tops = tops
      },
      handleClick(index){
       //你在调用这个方法的时候，就可以在那个标签内获取那个标签内的属性，
        // 所以你在这里需要传一个形参。这是一种思想
        const scrollY = this.tops[index];
        //实时更新所定义的scrollY
        this.scrollY = scrollY;
        //这是better-scroll的方法，可以让右侧列表滚动到对应的部分。
        this.foodScroll.scrollTo(0,-scrollY,300);
      },
      showFood(food){
        this.food = food;
        this.$refs.food.toggleShow();
      }
    },
    mounted(){
      this.$store.dispatch('getShopGoods',()=>{
        this.$nextTick(()=>{
          this._initTops();
          new Bscroll('.menu-wrapper',{
            click:true
          });
          this.foodScroll = new Bscroll('.foods-wrapper',{
            click:true,  //因为它并没有完全禁用原生的事件，所以最好设置为true能让它不会出现问题。
            probeType:3 //惯性滑动,就是在new这个后面加一个配置对象。
          })
          //给右侧列表绑定点击监听，实时收集scrollY.
          this.foodScroll.on('scroll',({x,y})=>{
            this.scrollY = Math.abs(y);
          });
          this.foodScroll.on('scrollEnd',({x,y})=>{
            this.scrollY = Math.abs(y);
          })
        })

      });
    }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 275px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: #3da4ff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

