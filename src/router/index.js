import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const index= r => require.ensure([], () => r(require('../views/index')), 'index');
const main = r => require.ensure([], () => r(require('../views/main/main')), 'main');
const record = r => require.ensure([], () => r(require('../views/main/record/record')), 'record');
const bloodsugar = r => require.ensure([], () => r(require('../views/main/bloodSugar/bloodsugar')), 'bloodsugar');
const analysis = r => require.ensure([], () => r(require('../views/main/analysis/analysis')), 'analysis');
const user = r => require.ensure([], () => r(require('../views/main/user/user')), 'user');
const user_info = r => require.ensure([], () => r(require('../views/user_info/user_info')), 'user_info');
const sugarGoal = r => require.ensure([], () => r(require('../views/sugarGoal/sugarGoal')), 'sugarGoal');
const weightRecord = r => require.ensure([], () => r(require('../views/weightRecord/weightRecord')), 'weightRecord');

const getqrcode = r => require.ensure([], () => r(require('../views/care/getqrcode')), 'getqrcode');
const etangCare = r => require.ensure([], () => r(require('../views/care/etangCare')), 'etangCare');
const etangCareInfo = r => require.ensure([], () => r(require('../views/care/etangCareInfo')), 'etangCareInfo');
const monitorplan = r => require.ensure([], () => r(require('../views/care/monitorplan')), 'monitorplan');
const feedback = r => require.ensure([], () => r(require('../views/feedback/feedback')), 'feedback');

const baseInfo = r => require.ensure([], () => r(require('../views/auth/base_info')), 'baseInfo');
const subjects = r => require.ensure([], () => r(require('../views/subjects/subjects')), 'subjects');
const routes = [{
		path:'/',
		component:main,
		meta:{index:2000},
		children:[{
			path: '',
			name:'index',
			meta:{index:2000},
			component:index
		},{
			path: 'record',
			name:'record',
			meta:{index:2000},
			component:record
		},{
			path:'bloodsugar',
			name:'bloodsugar',
			meta:{index:2000},
			component:bloodsugar
		},{
			path:'analysis',
			name:'analysis',
			meta:{index:2000},
			component:analysis
		},{
			path:'user',
			name:'user',
			meta:{index:2000},
			component:user,
		}]
	},{
		path:'/user_info',
		component:user_info,
		name:'user_info',
		meta:{index:3000}
	},
	{
		path:'/sugarGoal',
		component:sugarGoal,
		name:'sugarGoal',
		meta:{index:3000}
	},{
		path:'/weightRecord',
		name:'weightRecord',
		component:weightRecord,
		meta:{index:3000}
	},{
		path:'/getqrcode',
		name:'getqrcode',
		component:getqrcode,
		meta:{index:3000}
	},{
		path:'/etangCare',
		name:'etangCare',
		component:etangCare,
		meta:{index:1001}
	},{
		path:'/etangCareInfo',
		name:'etangCareInfo',
		component:etangCareInfo,
		meta:{index:1000}
	},{
		path:'/monitorplan',
		name:'monitorplan',
		component:monitorplan,
		meta:{index:1002}
	},{
		path:'/feedback',
		name:'feedback',
		component:feedback,
		meta:{index:3000}
	},{
		path:'/baseInfo',
		name:'baseInfo',
		component:baseInfo,
		meta:{index:0}
	},{
		path:'/subjects/:bldglucosePid',
		name:'subjects',
		props: true,
		component:subjects,
		meta:{index:3000}
	}]
	var router=new Router({
		// mode: 'history',
		linkActiveClass: 'mui-active',
		base:'/record_bg/ifv/',
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


