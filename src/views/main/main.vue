<template>
	<div class="wrapper">
		<nav class="mui-bar mui-bar-tab">
			<router-link to="/record" class="mui-tab-item" tag='div' @tap.native="toRouter('/record','replace')" >
				<span class="mui-icon icon-record"></span>
				<span class="mui-tab-label">记血糖</span>
			</router-link>
			<router-link class="mui-tab-item" to="/bloodsugar"  @tap.native="toRouter('/bloodsugar','replace')">
				<span class="mui-icon icon-his">
					<!--<span class="mui-badge">9</span>-->
				</span>
				<span class="mui-tab-label">记录</span>
			</router-link>
			<router-link class="mui-tab-item" to="/analysis"  @tap.native="toRouter('/analysis','replace')">
				<span class="mui-icon icon-analysis"></span>
				<span class="mui-tab-label">分析</span>
			</router-link>
			<router-link class="mui-tab-item" to="/user"  @tap.native="toRouter('/user','replace')">
				<span class="mui-icon icon-mine"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
		<div class="mui-content">
			<!-- <keep-alive> -->
				<router-view></router-view>
			<!-- </keep-alive> -->
			
		</div>
	</div>
</template>
<script>
	import {mapState} from "vuex"
	export default {
		data(){
			return {
			}
		},
		mounted:function(){
			// mui.init();
		},

		methods:{
			toRouter(path,method){
				if(method==='replace'){
					this.$router.replace(path)
				}else{
					this.$router.push(path)
				}
				
			}
		}
	}
</script>
<style scoped>
	.wrapper{min-height: 100%;position: relative;width: 100%;}
	.mui-bar-tab~.mui-content{position: absolute;top:0;left:0;width: 100%;min-height: 100%;padding-bottom: 50px;}
</style>
