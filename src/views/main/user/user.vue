<template>
	<div>
		<div class="mui-control-content mui-active" id="tabbar-mine" v-cloak>
			<div class="info" id="mine-info" @tap="toRouter('/user_info')">
				<img class="info_head" :src="userInfo.headPath" />
				<span>{{userInfo.userCode == null ? userInfo.nickName : "编号：" + userInfo.userCode}}</span>
				<img src="../../../../static/image/arrow_right_gray.png" class="item-arrow" />
			</div>
			<ul class="mui-table-view" style="margin: 10px 0;">
				<li class="mui-table-view-cell" id="bld_target" @tap="toRouter('/sugarGoal')">
					<img src="../../../../static/image/ic_bld_target.png" class="mui-pull-left item-icon" />
					<span>
						<span class="item-title">控糖目标</span>
					</span>
					<span class="mui-navigate-right"></span>
				</li>
				<li class="mui-table-view-cell" id="weight_change"  @tap="toRouter('/weightRecord')">
					<img src="../../../../static/image/ic_weight.png" class="mui-pull-left item-icon" />
					<span>
						<span class="item-title">体重变化</span>
					</span>
					<span class="mui-navigate-right"></span>
				</li>
				<li class="mui-table-view-cell" id="activity"  @tap="toRouter('/getqrcode')">
					<img src="../../../../static/image/ic_activity.png" class="mui-pull-left item-icon" />
					<span>
						<span class="item-title">天麦关怀活动</span>
					</span>
					<span class="mui-navigate-right"></span>
				</li>
				<li class="mui-table-view-cell" id="advice"  @tap="toRouter('/feedback')">
					<img src="../../../../static/image/ic_advice.png" class="mui-pull-left item-icon" />
					<span>
						<span class="item-title">我的建议</span>
					</span>
					<span class="mui-navigate-right"></span>
				</li>
			</ul>
			<!-- <div class="mine-tab-item" style="height: 40px; background: white; margin-top: 10px">
				<img src="../static/image/ic_mini_logo.png " class="item-icon " />
				<span style="font-size: 14px; color: #333; margin-left: 15px; ">推荐小程序</span>
			</div>
			<div style="height: 70px; background: white; display: flex; align-items: center; padding-left: 14px;" id="mini_etang60 ">
				<img src="../static/image/ic_etang60_logo.jpg" style="width: 40px; height: 40px;" />
				<div style="float: left; margin-left: 10px; flex-direction: column; display: flex;">
					<span style="font-size: 17px; color: #333; line-height: 24px; ">宜糖60秒</span>
					<span style="font-size: 12px; color: #666; ">每天一分钟，控糖更轻松</span>
				</div>
			</div> -->
		</div>
		
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex"
	import "../../../../static/css/mine_tab.css"
	export default {
		data(){
			return {
				baseInfo: ''
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		mounted(){
			let query=this.$route.query;
			if(query.visitTimes){
				this.checkCare();
				this.$router.replace('/user')
			}
		},
		methods:{
			toRouter(path,method) {
				if(path=='/getqrcode'&&this.checkCare()){
					return 
				}
				if(method==='repalce'){
					this.$router.replace(path)
				}else{
					this.$router.push(path)
				}
			},
			checkCare(){
				if(this.userInfo.midicineTimes>=this.userInfo.visitTimes){
					let muiAlert=mui.alert('尊敬的糖友，您已完成“天麦关怀”1型糖尿病关爱计划赠药项目！项目结束之后也请继续关注您的血糖控制情况哦！天麦生物让全球亿万糖患家庭生活更幸福！');
					muiAlert.element.classList="mui-popup mui-popup-in mui-alert"
					return true;
				}
			}
		}
	}
</script>

<style scoped>
  
</style>