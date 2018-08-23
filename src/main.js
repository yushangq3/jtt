import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'


Vue.config.productionTip = false

//TODO路由验证信息
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.hideNavBar)) {
		
		next();
  } else {

		next() // 确保一定要调用 next()
  }
})

new Vue({
	render: h => h(App),
	store,
	router,
	mounted:function(){
		// mui.init();
	}
}).$mount('#app')
