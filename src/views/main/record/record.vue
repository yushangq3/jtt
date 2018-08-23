<template>
	<div class="mui-control-content mui-active" id="tabbar-record" v-cloak>
		<div class="htmleaf-container bg-white">
			<div id="bodyContent">
				<recording :meal="selectMeal"></recording>
				<div class="tip_box  mui-clearfix">
					<div class="weightIconbox" style="float: right;">
						<div class="weightEveryDay" id="checkWeight">
							<span class="badge" style="display: none;">1</span>
						</div>
						<span>体重记录</span>
					</div>
					<!-- <div class="alarmClock" id='checkAlarm'>
							<div class="alarm_bg"></div>
							<span>餐后闹钟</span>
						</div> -->
				</div>
				<p class="font14 mui-text-center c-999 m5-0">
					<label id="valRange"></label>mmol/L
				</p>
			</div>
		</div>
		<div class="meal-time mui-row bg-white">
			<div class="mui-col-sm-4 mui-col-xs-4">
				<input type="radio" name="mealtime" data-name="beforeDawn" id="mealtime1" value="17" />
				<label for="mealtime1">凌晨</label>
			</div>
			<div class="mui-col-sm-4 mui-col-xs-4">
				<input type="radio" name="mealtime" data-name="beforeBreakfast" id="mealtime2" value="10" />
				<label for="mealtime2">空腹</label>
			</div>
			<div class="mui-col-sm-4 mui-col-xs-4">
				<input type="radio" name="mealtime" data-name="afterBreakfast" id="mealtime3" value="11" />
				<label for="mealtime3">早餐后</label>
			</div>
			<div class="mui-col-sm-4 mui-col-xs-4">
				<input type="radio" name="mealtime" data-name="beforeLanch" id="mealtime4" value="12" />
				<label for="mealtime4">午餐前</label>
			</div>
			<div class="mui-col-sm-4 mui-col-xs-4">
				<input type="radio" name="mealtime" data-name="afterLanch" id="mealtime5" value="13" />
				<label for="mealtime5">午餐后</label>
			</div>
			<div class="mui-col-sm-4 mui-col-xs-4">
				<input type="radio" name="mealtime" data-name="beforeDinner" id="mealtime6" value="14" />
				<label for="mealtime6">晚餐前</label>
			</div>
			<div class="mui-col-sm-4 mui-col-xs-4">
				<input type="radio" name="mealtime" data-name="afterDinner" id="mealtime7" value="15" />
				<label for="mealtime7">晚餐后</label>
			</div>
			<div class="mui-col-sm-4 mui-col-xs-4">
				<input type="radio" name="mealtime" data-name="beforeBed" id="mealtime8" value="16" />
				<label for="mealtime8">睡前</label>
			</div>
			<div class="mui-col-sm-4 mui-col-xs-4">
				<input type="radio" name="mealtime" data-name="random" id="mealtime9" value="18" />
				<label for="mealtime9">随机</label>
			</div>
			<p class="mui-col-sm-12 mui-col-xs-12">
				<span class="dhkDate data" data-options='{}' id="recordTime"></span>
				<span class="mui-icon mui-icon-arrowright c-ccc dhkDate"></span>
			</p>
		</div>
		<button class="mui-btn mui-btn-save" id="saveGlu">保存</button>
	</div>
</template>
<script>
	 import recording from '../../../components/recording'
	 export default {
		  data(){
				return {
					 selectMeal:16
				}
			},
			components:{
				recording
			},
			
	 }
</script>
<style>

</style>
