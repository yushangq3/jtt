import * as types from './mutation-types.js'

export default {
		changeUserInfo(context,flag){
			context.commit(types.UPDATEUSERINFO,flag);
		},
		hideLoading(context,info){
			context.commit(types.CHANGELOADING,false)
		},
		showLoading(context,info){
			context.commit(types.CHANGELOADING,true)
		}
}