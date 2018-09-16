<template>
	<div class="mui-content activity">
		<img src="../../../static/image/activity.png" >
	</div>	
</template>

<script>
	import { mapState, mapActions } from "vuex"
	export default {
		computed:{
			...mapState(['userInfo'])
		},
		mounted(){
			let timeStamp=new Date().getTime(),that=this;
			setTimeout(function(){
				if(that.userInfo.isCare){
					that.$router.replace('/getqrcode')
				}else{
					that.$router.replace('/etangCare')
				}
			},3000)
		}
	}
</script>

<style scoped>
@import '../../../static/css/care.css'
</style>