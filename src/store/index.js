import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex)

const state = {
	isLoading:false,
	userInfo:null,
	openId:null
	
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
})