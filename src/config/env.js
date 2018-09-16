/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * 
 * 
 */

let baseUrl = ''; 
let routerMode = 'history';
let imgBaseUrl;


if (process.env.NODE_ENV == 'development') {
    // baseUrl = 'https://apptest.etangbio.com';
    baseUrl = 'https://app3.51etang.com';


}else if(process.env.NODE_ENV == 'production'){
	// baseUrl = 'https://apptest.etangbio.com';
	// baseUrl = 'http://cangdu.org:8001';
    baseUrl = 'https://app3.51etang.com';

}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}