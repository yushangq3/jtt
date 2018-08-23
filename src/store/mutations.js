import * as types from './mutation-types.js'
import Vue from 'vue'

export default {
	
		[types.UPDATEUSERINFO](state,info){
			for (let i in info){
				if(info.hasOwnProperty(i)&&i!==bldGluList){
					Vue.set(state.userInfo,i,info[i]);
				}
			}
		},
		[types.GETOPENID](state,info){
			state.openId=info
		},
		[types.CHANGELOADING](state,info){
			state.isLoading=info
		}
	}
