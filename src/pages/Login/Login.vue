<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isShowLogin }" @click="isShowLogin = true">短信登录</a>
          <a href="javascript:;" :class="{on: !isShowLogin }" @click="isShowLogin = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: isShowLogin }">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!isRightPhone||computedTime>0" class="get_verification"
                      :class="{black: isRightPhone,gray: computedTime>0}" @click.prevent="sendCode()">{{computedTime>0?`已发送${computedTime}S`:`获取验证码`}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !isShowLogin }">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button" :class="isShowpwd?'on':'off'" @click="isShowpwd=!isShowpwd">
                  <div class="switch_circle" :class="{right:isShowpwd}"></div>
                  <span class="switch_text">...</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="updateCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="goback">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
  import {reqPhone,reqPhoneMsg,reqLogin} from '../../api/index'
  import {Toast,MessageBox} from 'mint-ui'
  export default {
    data() {
      return {
        isShowLogin:true,// false:密码, true: 短信
        computedTime:0,
        isShowpwd:false,
        phone:'',
        pwd:'',
        captcha:'',
        name:'',
        code:''
      }
    },
    methods:{
      goback(){
        this.$router.replace('/profile');
      },
      async sendCode(){
        //实现倒计时效果
        this.computedTime = 20;
        let Timer = setInterval(()=>{ //回调函数一定要用箭头函数哈，避免出错。
          this.computedTime--;
          if(this.computedTime<=0){
            this.computedTime = 0;
            clearInterval(Timer);
          }
        },1000);

        //发送ajax请求,将验证码请求回来。
        const result = await reqPhone(this.phone);//result={code,data={}};
        if(result.code === 0){
          Toast('已成功发送');
        }else{
          MessageBox.alert('发送失败','提示');
        }
      },
      updateCaptcha(event){//对于这种需要实时改变的验证码，就需要通过设置随机数或者时间戳的方式请求图片
        this.$refs.captcha.src = "http://localhost:4000/captcha?time="+Date.now()
      //本来是event.target.src，为什么要改成这样呢，因为验证码的变化并不是手动的
        //如果你输错了，它是要自动更新的，所以要使用到ref属性去指定它。
      },
      async login(){
        const{name,phone,pwd,code,captcha} = this;
        if(this.isShowLogin){
          if(!this.isRightPhone){
            MessageBox.alert('请输入正确手机号','提示');
          }else if(!/^\d{6}$/.test(code)){
            MessageBox.alert('请输入正确验证码','提示');
          }
          let result = await reqPhoneMsg(phone,code);
          if(result.code === 0){
            let user = result.data;
            //将user保存一下
            this.$store.dispatch('setUser',user);
            this.$router.replace('/profile');
          }
        }else{
          if(!name){
            MessageBox.alert('请输入用户名','提示');
          }else if(!pwd){
            MessageBox.alert('请输入密码','提示');
          }else if(!captcha){
            MessageBox.alert('请输入验证码','提示');
          }
          /*发送ajax请求，来请求用户信息*/
          let result = await reqLogin(name,pwd,captcha);
          if(result.code === 0){
            let user = result.data;

            //将user保存一下
            this.$store.dispatch('setUser',user);
            this.$router.replace('/profile');
          }else{
            this.computedTime = 0
            this.updateCaptcha();
            // 更新图形验证码(必须是密码登陆)
            this.isShowLogin && this.updateCaptcha()
          }
        }
      }
    },
    computed:{
      isRightPhone(){
        return /^1\d{10}$/.test(this.phone)
      }
    },
    mounted(){

    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #3da4ff
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #3da4ff
              font-weight 700
              border-bottom 2px solid #3da4ff
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #3da4ff
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 46%
                right 1px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
              .black
                color black
              .gray
                color #ddd
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #3da4ff
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #3da4ff
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #3da4ff
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
