import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import {getPara,isEmptyObject} from './assets/js/common'
import {getUserInfo,getUserGLuList} from './service/getData'

Vue.config.productionTip = false

// const userId='100000002607';
const userId=getPara(/userid=/g);
const openId=getPara(/openid=/g);
const code=getPara(/^code=/g);
const istoQrcode=getPara(/qrcode=/g);

sessionStorage.removeItem('code');
sessionStorage.removeItem('istoQrcode');

code?sessionStorage.setItem('code',code):'';
istoQrcode?sessionStorage.setItem('istoQrcode',istoQrcode):'';	
		
store.dispatch('getUserId',userId);
store.dispatch('getOpenId',openId);

getUserGLuList().then(res=>{
	if(res.code==='0'){
		store.dispatch('changeGLuList',res.data);
	}
})

//TODO路由验证信息
router.beforeEach((to, from, next) => {
  let userInfo=store.state.userInfo;
  if(!isEmptyObject(userInfo)){
	  next()
  }else{
	  getUserInfo().then(res=>{
			if(res.code==='0'){
				store.dispatch('changeUserInfo',res.data);
				next()
			}
	  }).catch(error=>{
		  next()
	  });
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
