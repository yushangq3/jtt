
import {getCookie} from '../config/mUtils'
import fetch from '../config/fetch'

/*
 获取用户信息
 
 * */
export const logout = () =>{
	return fetch('/apiBehringUser/logout', {},'post');
}
