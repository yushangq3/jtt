<template>
	<div class="mui-control-content mui-active" id="tabbar-record" v-cloak>
		<div class="htmleaf-container bg-white">
			<div id="bodyContent">
				<recording ref="canvaspan" :meal="selectMeal"></recording>
				<div class="tip_box  mui-clearfix">
					<div class="weightIconbox" style="float: right;" @tap="weightAdd">
						<div class="weightEveryDay" id="checkWeight">
							<span class="badge" v-show="weightBadge">1</span>
						</div>
						<span>体重记录</span>
					</div>
					<div class="blgLow" id="blgLow" v-if="blgLow" @tap="sendBlgLow">
						<div class="blgLowBox"></div>
						<span>低血糖</span>
					</div>
					<!-- <div class="alarmClock" id='checkAlarm'>
							<div class="alarm_bg"></div>
							<span>餐后闹钟</span>
						</div> -->
				</div>
				<p class="font14 mui-text-center c-999 m5-0">
					<label id="valRange">{{getTip}}</label>mmol/L
				</p>
			</div>
		</div>
		<div class="meal-time mui-row bg-white">
			<div class="mui-col-sm-4 mui-col-xs-4" v-for='(item,k) in mealtime'>
				<input type="radio" name="mealtime" v-model="selectMeal" :id="'mealtime'+k" :value="item" />
				<label :for="'mealtime'+k" >{{getMealsNameCN(item)}}</label>
			</div>
			<p class="mui-col-sm-12 mui-col-xs-12" @tap='dtPickerShow'>
				<span class="dhkDate data" id="recordTime">{{nowTime|formate}}</span>
				<span class="mui-icon mui-icon-arrowright c-ccc dhkDate"></span>
			</p>
		</div>
		<button class="mui-btn mui-btn-save" :disabled="disabled" @tap="saveGlu">保存</button>
		<weight-mask ref="weightDialog" @add='addWeightRecord'></weight-mask>
	</div>
</template>
<script>
	 import recording from '../../../components/recording'
	 import weightMask from '../../../components/weightMask'
	 import {setMeal,getMealsNameCN,getLevel,getRange,formatDate,formatTime} from '../../../assets/js/common'
	 import dtpicker from "../../../../static/js/mui.picker.min.js"
	 import {toSaveGlu,weightList} from '../../../service/getData'
	 import { mapState, mapActions } from "vuex"
	 export default {
		  data(){
				return {
					 selectMeal:'',
					 mealtime:[17,10,11,12,13,14,15,16,18],
					 nowTime:new Date(),
					 disabled:false,
					 blgLow:false, //低血糖按钮是否显示,
					 weightBadge:false, //添加体重 角标显示
				}
			},
			computed:{
				...mapState([
					'userInfo'
				]),
				getTip(){
					let range=getRange(this.selectMeal);
					let name=getMealsNameCN(this.selectMeal)+'目标：'
					return name+range.join('~');
				}
			}, 
			components:{
				recording,weightMask
			},
			
			mounted(){
				let nowDate=new Date(),
						hour=nowDate.getHours(),
						mint=nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes(),
						dt =hour + '' +mint;
				
				setMeal(dt).then(res=>{
					this.selectMeal=res
				});
				this.checkWeight()
				// mui.init();
			},
			filters: {
				formate: function (val) {
					if (val instanceof Date) {
						return formatDate(val) + ' ' + formatTime(val);
					} else {
						return val;
					}
				}
			},
			methods:{
				getMealsNameCN(meal){
					return getMealsNameCN(meal);
				},
				dtPickerShow(){
					let optionsJson = {
								type: "datetime", //设置日历初始视图模式 
								endDate: new Date(), //设置开始日期 
							},
							that=this;
					const picker = new mui.DtPicker(optionsJson);
					picker.show(function (rs) {
						that.nowTime = rs.text;
						picker.dispose();
					});
				},
				saveGlu(){
						let formate=this.$options.filters['formate'],
								recording=this.$refs.canvaspan,
								data={
									'measureTime':formate(this.nowTime)+':00',
									'bloodGlucose':recording.val,
									'mealsTimes':this.selectMeal,
									'levelCode':recording.level
								};
						this.savGluList(data);
				},
				checkWeight() {
					let that=this;
					if (this.userInfo.isCare==1) {
						this.blgLow=true;
						let weightListOption={
							pageNum:1,
							pageSize:1
						}
						weightList(weightListOption).then(res=>{
							if (res.code === '0'&&res.dataSize>= 1) {
								let time = formatDate(new Date(res.data[0].recordTime));
								let nowTime = formatDate(new Date());
								if (time !== nowTime) {
									that.weightBadge=true;
								}else{
									that.weightBadge=false;
								}
							}else if(res.code === '0'){
								that.weightBadge=true;
							}
						})
					}
				},
				sendBlgLow(){
								let day1 = new Date();
								day1.setTime(day1.getTime()-24*60*60*1000)
								let	that=this,yesterday=formatDate(day1),
										today=formatDate(new Date()),
										tohour=new Date().getHours(),
										option={
											layer: 2
										},
										timepick = new mui.PopPicker(option),
										childrenData=[{
											value: "10:00",
											text: "上午"
										},{
											value: "16:00",
											text: "下午"
										},{
											value: "20:00",
											text: "晚上"
										}];
								let pickheader=timepick.panel.querySelectorAll('.mui-poppicker-header')[0];
								let node=document.createElement('div');
								node.className='dtpicker_header_title';
								node.innerHTML="请选择您最近一次出现低血糖症状的时间"
								day1.setTime(day1.getTime()-24*60*60*1000)
								timepick.setData([{
									value:yesterday,
									text:'昨天',
									children:childrenData,
								},{
									value:today,
									text:'今天',
									children:childrenData,
								}]); 
								
								timepick.pickers[0].setSelectedIndex(1);
								if(tohour>=19||tohour<=4){
									timepick.pickers[1].setSelectedIndex(2);
								}else if(tohour>=14){
									timepick.pickers[1].setSelectedIndex(1);
								}else{
									timepick.pickers[1].setSelectedIndex(0);
								}
								// className
								timepick.panel.className+=" lowGLuDtpicker";
							
								timepick.panel.insertBefore(node,pickheader)
								timepick.show(function (a) {
									timepick.dispose();
									let data={
										'measureTime': a[0].value+' '+a[1].value + ":00",
										'bloodGlucose': '0.1',
										'mealsTimes':'18',
										'levelCode': getLevel(18, Number(0.1))
									}
									
									that.savGluList(data)
									
								})
								
								
				},
				savGluList(data){
					let that=this,
							levelCode=data.levelCode;
					that.disabled=true;		
					toSaveGlu(data).then(res=>{
						that.disabled=false;
						if(res.code==0){
							if(that.userInfo.isCare==1&&(levelCode=="FPG001" || levelCode == 'FPG002' || levelCode =='FPG005'|| levelCode == 'FPG006')){
								let subjectDate=localStorage.getItem('subjectDate'),
										DateNow=formatDate(new Date());
								if(subjectDate!=DateNow){
									//TODO
									that.$router.push({name:'subjects',params: { bldglucosePid:  res.data.pid }})
									//跳转问卷页面
									localStorage.setItem('subjectDate',formatDate(new Date()));
									return false;
								}
							}
							mui.toast('保存血糖成功');
							that.$router.push({name:'bloodsugar'})
						}else{
							mui.toast('保存血糖失败')
						}
					}).catch(err=>{
						that.disabled=false
					})
				},
				weightAdd(){
					this.$refs.weightDialog.changeStatus()
				},
				addWeightRecord(res){
					console.log(this)
					if(res.code=='0'){
						mui.toast('体重记录成功');
						this.weightBadge=false;
						this.weightAdd();
					}
				}
				
			}
	 }
</script>
<style>

</style>
