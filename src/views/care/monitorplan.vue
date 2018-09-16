<template>
	<div class="mui-content monitorplan-content">
		<div class="monitorplan_title">每日早晨空腹+任1次餐后2小时+睡前</div>
		<div class="monitorImg">
			<img src="../../../static/image/monitorplan.png" alt="">
		</div>
		<div class="care_btn mui-btn active" @tap="next" id="monitionrplan_btn">下一步</div>
	</div>
</template>

<script>
	export default{
		methods:{
			next(){
				this.$router.replace('/getqrcode')
			}
		}
	}
</script>

<style scoped>
@import '../../../static/css/care.css'
</style>
