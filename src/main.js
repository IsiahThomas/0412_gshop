// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import HeaderTop from './components/HeaderTop/HeaderTop.vue'
import store from './store/index'
import {Button} from 'mint-ui'
// Vue.config.productionTip = false

Vue.component('HeaderTop',HeaderTop)
Vue.component(Button.name,Button); //mt-button诞生
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>',

  /*
  下面一句相当于这两句
  components: { App },
  template: '<App/>'
  还相当于
  render:function(createElement){return createElement(App);}
  */
  router,
  render:(h)=> h(App),
  store

}).$mount('#app')
