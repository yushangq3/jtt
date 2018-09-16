<template>
	<div class="mui-content getqrcode">
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<a class="mui-control-item" href="#item1mobile">
					问诊二维码
				</a>
				<a class="mui-control-item" href="#item2mobile">
					领药二维码
				</a>
			</div>
			<div id="sliderProgressBar" class="mui-slider-progress-bar mui-col-xs-6"></div>
			<div class="mui-slider-group">
				<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
					<img :src="userInfo.inquiryCrcodeUrl"/>
					<div class="tip">
						领药时请将此二维码出示给您的医生，您可在【我的】-【天麦关怀活动】中查看此二维码
					</div>
					
				</div>
				<div id="item2mobile" class="mui-slider-item mui-control-content">
					<img :src="userInfo.recipeCrcodeUrl"/>
					<div class="tip">
						领药时请将此二维码出示给药店工作人员，您可在【我的】-【天麦关怀活动】中查看此二维码
					</div>
				</div>
			</div>
			<button type="button" class="mui-btn" @tap="back" id="gomain">完成</button>
		</div>
	</div>

</template>

<script>
	
	import { mapState, mapActions } from "vuex"
	export default {
		data(){
			return {
				
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		mounted(){
			mui('.mui-slider').slider();
			mui('.mui-scroll-wrapper.mui-slider-indicator.mui-segmented-control').scroll({
				scrollY: false,
				scrollX: true,
				indicators: false,
				snap: '.mui-control-item'
			});
		},
		methods:{
			back(){
				console.log(123)
				this.$router.replace('/user')
			}
		}
	}
</script>

<style scoped>
 @import '../../../static/css/care.css'
</style>