import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const main = r => require.ensure([], () => r(require('../views/main/main')), 'main');
const record = r => require.ensure([], () => r(require('../views/main/record/record')), 'record');
const us = r => require.ensure([], () => r(require('../views/main/my/my')), 'us');

const routes = [{
		path:'/',
		component:main,
		children:[{
			path: '',
			redirect:'/record'
		},{
			path: 'record',
			name:'record',
			component:record
		},{
			path:'us',
			name:'us',
			component:us,
		}]
	}]
	var router=new Router({
		mode: 'history',
		linkActiveClass: 'mui-active',
		base:'/',
		routes,
		scrollBehavior (to, from, savedPosition) {
		    if (savedPosition) {
			    return savedPosition
			} else {
				var top = document.documentElement.scrollTop || document.body.scrollTop;
			    return { x: 0, y: top || 0 }
			}
		}
	})
	
	
export default router;


