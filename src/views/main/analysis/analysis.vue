<template>
	<div class=" bg-white pdb80" id="tabbar-analysis" v-cloak>
		<div class="header">
			<button class="mui-btn" id="preWeek" @click="prevWeek">
				<span class="arr_pre"></span>
				<span class="arrow_text">前一周</span>
			</button>
			<span class="font12 c-666 m0-15 arrow_title">{{startDate}} 至 {{endDate}}</span>
			<button :class="isDisabled?'mui-btn disabled':'mui-btn'" :disabled="isDisabled" id="nextWeek" @click="nextWeek">
				<span class="arrow_text">后一周</span>
				<span class="arr_next"></span>
			</button>
		</div>
		<p class="chart-title">整体占比概况</p>
		<!-- 饼状图 -->
		<div class="position-relative" id="showchart">
			<div id="chartContent">
				<div class="chart" ref="pieChart" id="pieChart"></div>
			</div>
			<div class="rate"  v-show="hasData">
				<p>本周达标率</p>
				<p>
					<span>{{data.normal}}</span>
					<span>%</span>
				</p>
			</div>
			<div class="rate" v-show="!hasData">
				<p>本周无数据</p>
				<button id="btnRecord" @tap="toRecord">去记血糖</button>
			</div>
		</div>
		<!-- 无数据 -->
		<!-- <div class="position-relative" id="hidechart"  v-show="!hasData">
			<div class="no-chartdata">
			</div>
			<div class="rate">
				<p>本周无数据</p>
				<button id="btnRecord" @tap="toRecord">去记血糖</button>
			</div>
		</div> -->

		<div class="mui-text-center mt3">
			<span class="tagging bg-72B4EF"></span>
			<span class="mr20 font14 color-72B4EF">正常 {{data.normalCount}}次</span>
			<span class="tagging bg-FFAB73"></span>
			<span class="mr20 font14 color-FFAB73">偏高 {{data.highCount}}次</span>
			<span class="tagging bg-FA7B7B"></span>
			<span class="mr20 font14 color-FA7B7B">偏低 {{data.lowCount}}次</span>
		</div>
		<div class="proportion">
			<p class="font16 c-333 mui-text-center bold">异常时间及次数</p>
			<div class="display-flex-justify mb12">
				<div class="font14 c-666">凌晨</div>
				<div class="proportion-bar">
					<span :style="{'width':data.meals17*100/7+'%'}"></span>
				</div>
				<div class="font14 c-666">{{data.meals17}}次</div>
			</div>
			<div class="display-flex-justify mb12">
				<div class="font14 c-666">空腹</div>
				<div class="proportion-bar">
					<span :style="{'width':data.meals10*100/7+'%'}"></span>
				</div>
				<div class="font14 c-666">{{data.meals10}}次</div>
			</div>
			<div class="display-flex-justify mb12">
				<div class="font14 c-666">早餐后</div>
				<div class="proportion-bar">
					<span :style="{'width':data.meals11*100/7+'%'}"></span>
				</div>
				<div class="font14 c-666">{{data.meals11}}次</div>
			</div>
			<div class="display-flex-justify mb12">
				<div class="font14 c-666">午餐前</div>
				<div class="proportion-bar">
					<span :style="{'width':data.meals12*100/7+'%'}"></span>
				</div>
				<div class="font14 c-666">{{data.meals12}}次</div>
			</div>
			<div class="display-flex-justify mb12">
				<div class="font14 c-666">午餐后</div>
				<div class="proportion-bar">
					<span :style="{'width':data.meals13*100/7+'%'}"></span>
				</div>
				<div class="font14 c-666">{{data.meals13}}次</div>
			</div>
			<div class="display-flex-justify mb12">
				<div class="font14 c-666">晚餐前</div>
				<div class="proportion-bar">
					<span :style="{'width':data.meals14*100/7+'%'}"></span>
				</div>
				<div class="font14 c-666">{{data.meals14}}次</div>
			</div>
			<div class="display-flex-justify mb12">
				<div class="font14 c-666">晚餐后</div>
				<div class="proportion-bar">
					<span :style="{'width':data.meals15*100/7+'%'}"></span>
				</div>
				<div class="font14 c-666">{{data.meals15}}次</div>
			</div>
			<div class="display-flex-justify mb12">
				<div class="font14 c-666">睡前</div>
				<div class="proportion-bar">
					<span :style="{'width':data.meals16*100/7+'%'}"></span>
				</div>
				<div class="font14 c-666">{{data.meals16}}次</div>
			</div>
		</div>
		<div class="advice">
			<div class="mui-text-center mb30">
				<img src="../../../../static/image/advice.png" />
			</div>
			<p v-for="(item,index) in data.weekSuggests">{{index+1}}、{{item.replace("测糖方案说明","")}}</p>
			<img src="../../../../static/image/hand.png" alt="" class="img-bottom" />
		</div>
	</div>

</template>

<script>
	import {Calendar,formatDate} from '../../../assets/js/common'
	import {getAnalysis} from '../../../service/getData'
	import echarts from '../../../../static/js/echarts.min.js'
	export default {
		data(){
			return {
				data: '',
				startDate: '',
				endDate: '',
				showPie: true,
				isDisabled: true,
				currertDay:'',
				hasData:false,
				pieChart:null
			}
		},
		mounted(){
			this.pieChart = echarts.init(this.$refs.pieChart);
			this.getDate();
			this.getAnalysis();
			
			// getAnalysis(getWeekStartDate(), getWeekEndDate());
		},
		methods:{
			getDate(){
				let dtTime=new Calendar();
				this.currertDay =dtTime.nowDay;
				dtTime.nowDay =this.currertDay-= 7;
				this.startDate=dtTime.getWeekStartDate();
				this.endDate=dtTime.getWeekEndDate();
				this.checkisCurrentWeek()
			},
			getAnalysis(){
				let that=this;
				getAnalysis({startDate:this.startDate,endDate:this.endDate})
				.then(res=>{
					if(res.code==0){
						that.data=res.data;
						let options;
						if (res.data.highCount == 0 && res.data.lowCount == 0 && res.data.normalCount == 0) {
							that.hasData=false;
							options={
								calculable: false,
								series: [
									{
										name:'整体占比状况',
										type:'pie',
										radius: '65%',
										center: ['50%', '50%'],
										avoidLabelOverlap: false,
										label: {
											normal: {
												show: true,
												position: 'center'
											},
											emphasis: {
												show: true,
												textStyle: {
													fontSize: '30',
													fontWeight: 'bold'
												}
											}
										},
										labelLine: {
											normal: {
												show: true
											}
										},
										data:[
											{value:100, name:'',itemStyle:{
												color:'#DFDFDF'
											}},
										   
										]
									}
								]
							}
							
						}else{
							console.log(that.data)
							that.hasData=true;
							options={
									calculable: false,
									series: [{
										name: '整体占比概况',
										type: 'pie',
										radius: '65%',
										center: ['50%', '50%'],
										label: {
											normal: {
												textStyle: {
													fontSize: 12,
													fontWeight:'normal',
													// color: 'rgba(255, 255, 255, 0.3)'
												}
											}
										},
										data: [{
											value: that.data.normalCount,
											name: that.data.normal + '%',
											itemStyle:{
												color:'#72B4EF'
											}
										}, {
											value: that.data.highCount,
											name: that.data.high + '%',
											itemStyle:{
												color:'#FDA13B'
											}
										}, {
											value: that.data.lowCount,
											name: that.data.low + '%',
											itemStyle:{
												color:'#D74A4A'
											}
										}],
										itemStyle: { // 此配置
											normal: {
												borderWidth: 4,
												borderColor: '#ffffff',

											}
										}
									}],
									color: ['#72B4EF', '#FDA13B', '#D74A4A'],
									// animation: false,
									textStyle: {
										fontSize: 16,
										fontWeight: 'bold'
									}
										
								}
							
						}
						this.pieChart.setOption(options, true);
					}
					
				})
			},
			prevWeek() {
				let dtTime=new Calendar();
				dtTime.nowDay =this.currertDay-= 7;
				this.startDate=dtTime.getWeekStartDate();
				this.endDate=dtTime.getWeekEndDate();
				this.getAnalysis()
				this.isDisabled = false;
			},
			nextWeek() {
				let dtTime=new Calendar();
				dtTime.nowDay =this.currertDay+= 7;
				this.startDate=dtTime.getWeekStartDate();
				this.endDate=dtTime.getWeekEndDate();
				this.getAnalysis()
				this.checkisCurrentWeek()
			},
			checkisCurrentWeek(){
				let startTime=this.startDate.split('-'),
					dtTime=formatDate(new Date(startTime[0],startTime[1]-1,Number(startTime[2])+7)).split('-'),
					current=new Calendar().getWeekStartDate(),
					currentTime=current.split('-'),
					startY=Number(dtTime[0]),
					startM=Number(dtTime[1]),
					startD=Number(dtTime[2]),
					currentY=Number(currentTime[0]),
					currentM=Number(currentTime[1]),
					currentD=Number(currentTime[2]);
				if (startD >= currentD&&startY==currentY&&startM==currentM) {
					this.isDisabled = true;
				}
			},
			toRecord(){
				this.$router.replace('/record');
			}
		
		},
	}

</script>

<style scoped>
	#tabbar-analysis{
		position: relative;
	}
</style>
