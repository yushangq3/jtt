<template>
	<div >
		<nav class="mui-bar mui-bar-tab">
			<router-link to="/record" class="mui-tab-item">
				<span class="mui-icon icon-record"></span>
				<span class="mui-tab-label">记血糖</span>
			</router-link>
			<router-link class="mui-tab-item" to="/recordData">
				<span class="mui-icon icon-his">
					<!--<span class="mui-badge">9</span>-->
				</span>
				<span class="mui-tab-label">记录</span>
			</router-link>
			<router-link class="mui-tab-item" to="/recordData2">
				<span class="mui-icon icon-analysis"></span>
				<span class="mui-tab-label">分析</span>
			</router-link>
			<router-link class="mui-tab-item" to="/recordData3">
				<span class="mui-icon icon-mine"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
		<div class="mui-content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	import {mapState} from "vuex"
	export default {
		computed:{
			...mapState([])
		},
	}
</script>
<style>

</style>
