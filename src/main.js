import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import { Toast , MessageBox  } from 'mint-ui';
import 'amfe-flexible';
import VueLazyLoad from 'vue-lazyload';

Vue.use(VueLazyLoad,{
  error:require('./assets/images/error.png'),
  loading:require('./assets/images/loading.gif')
});

Vue.prototype.$toast = Toast;
Vue.prototype.$messageBox = MessageBox;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

