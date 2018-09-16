<template>
	<div>

	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex"
	export default {
		computed:{
			...mapState([
				'userInfo'
			])
		},
		mounted(){
			let isCare=this.userInfo.isCare,
				code=sessionStorage.getItem('code'),
				istoQrcode=sessionStorage.getItem('istoQrcode'),
				midicineTimes=this.userInfo.midicineTimes?this.userInfo.midicineTimes:0,
				visitTimes=this.userInfo.visitTimes;
			if(code&&(!isCare)){
				this.$router.replace({path:'/etangCareInfo'});
			}else if(code&&isCare){
				this.$router.replace({path:'/getqrcode'});
			}else if(isCare&&istoQrcode){
				if(midicineTimes<visitTimes){
					this.$router.replace({path:'/user',query:{ midicineTimes:midicineTimes,visitTimes:visitTimes}})
					// this.$router.replace({path:'/getqrcode'});
				}else{
					this.$router.replace({path:'/user',query:{ midicineTimes:midicineTimes,visitTimes:visitTimes}})
				}
			}
			else if(this.userInfo.height==null){
				this.$router.replace({path:'/baseInfo'});
			}else{
				this.$router.replace({path:'/record'})
			}
		}
	}
</script>

<style scoped>

</style>