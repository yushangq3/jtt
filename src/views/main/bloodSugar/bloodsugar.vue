<template>
	<div class="bg-white " id="tabbar-record-his" v-cloak>
		<div class="record-his-main" v-show='ismain'>
			<div class="mui-text-center pd5-0">
				<span class="arrow-left pd0-10" id="arrowLeft" @tap="prevWeek"></span>
				<span class="c-333 m0-15" :class='weekSpanText=="本周"?"font18":"font14"'>{{weekSpanText}}</span>
				<span class="arrow-right pd0-10" id="arrowRight" v-show="!hiddenNextWeekBtn"  @tap="nextWeek"></span>
			</div>
			<div class="tb-record">
				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
						<th rowspan="2" class="bg-f4f4f4">日期</th>
						<th rowspan="2">凌晨</th>
						<th colspan="2" class="bg-f4f4f4">早餐</th>
						<th colspan="2">午餐</th>
						<th colspan="2" class="bg-f4f4f4">晚餐</th>
						<th rowspan="2">睡前</th>
					</tr>
					<tr>
						<th class="bg-f4f4f4">前</th>
						<th class="bg-f4f4f4">后</th>
						<th>前</th>
						<th>后</th>
						<th class="bg-f4f4f4">前</th>
						<th class="bg-f4f4f4">后</th>
					</tr>
					<tr v-for="(item,k) in dates" :measureTime="item.date">
						<!-- red blue orange 三种颜色控制状态-->
						<td :class="{'red':gluList[k].randomCount,'active':activeClass==[dates[k].text,18].toString()}" class="record-date" @tap="getGluTip(18,gluList[k])">
							<span class="font10">{{dates[k].month}}/</span>
							<span class="font14">{{dates[k].day}}</span>
							<span class="remarked">{{gluList[k].ranDomRemark}}</span>
						</td>
						
						<td v-for="(value,v) in mealArray" class="glu-val" :class="{'active':activeClass==[dates[k].text,value].toString()}"  @tap="getGluTip(value,gluList[k])" :levelCode="gluList[k][getMealsName(value)+'Code']">
							<span class="item-val">{{gluList[k][getMealsName(value)] }}</span>
							<span>{{gluList[k][getMealsName(value)+'Remark']}}</span>
						</td>
					</tr>
				</table>
			</div>
			<div class="bg-white pd5-5p" style="margin-bottom: 20px;">
				<div class="display-flex-justify">
					<div>
						<span class="tagging piont-blue"></span>
						<span class="mr10 font14 c-333">达标</span>
						<span class="tagging piont-orange"></span>
						<span class="mr10 font14 c-333">偏高</span>
						<span class="tagging piont-red"></span>
						<span class="mr10 font14 c-333">偏低</span>
					</div>
				</div>
			</div>
			<div class="mark-content">
				<ul class="mui-clearfix" :style="{width:tips.length*95 +15+ 'px'}">
					<li v-for="(item,k) in tips" :levelCode='item.code' @click='toRecord(item,k)'>
						<div class="time">{{item.time}}</div>
						<div class="concentration">{{item.concent}}mmol/L</div>
						<div class="tip">备注：
							<span>{{item.tip}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="record-his-re" v-show='!ismain'>
			<div class="record-re-time">
				{{dataRe.time}}
			</div>
			<div class="record-re-cont" :levelcode="dataRe.code">
				{{dataRe.cont}}
				<span>mmol/L</span>
			</div>
			<div class="record-re-delete" @click='del'>
				删除记录
			</div>
			<div class="record-re-text">
				<textarea placeholder="备注:" v-model="dataRe.text" maxlength="200"></textarea>
			</div>
			<div class="mui-btn mui-btn-save" @click='save'>保存</div>
			<div class="mui-btn mui-btn-back" @click='back'>返回</div>
		</div>
	</div>

</template>

<script>
	import {Calendar,getMealsName,getMealsNameCN,formatDate,formatTime} from '../../../assets/js/common'
	import {getGluList,getRadomTips,getTipData,delGlu,saveGlu} from '../../../service/getData'
	export default {
		data(){
			return {
				ismain: true,
				dataRe: {},
				dates:null,
				gluList:[],
				gluListModel:{
					afterBreakfast:null,
					afterBreakfastCode:null,
					afterBreakfastRemark:null,
					afterDinner:null,
					afterDinnerCode:null,
					afterDinnerRemark:null,
					afterLanch:null,
					afterLanchCode:null,
					afterLanchRemark:null,
					beforeBed:null,
					beforeBedCode:null,
					beforeBedRemark:null,
					beforeBreakfast:null,
					beforeBreakfastCode:null,
					beforeBreakfastRemark:null,
					beforeDawn:null,
					beforeDawnCode:null,
					beforeDawnRemark:null,
					beforeDinner:null,
					beforeDinnerCode:null,
					beforeDinnerRemark:null,
					beforeLanch:null,
					beforeLanchCode:null,
					beforeLanchRemark:null,
					date:null,
					levelCode:null,
					randomCount:0
				},
				mealArray:[17,10,11,12,13,14,15,16],
				tips:[],
				startDate:'',
				endDate:'',
				activeClass:null,
				hiddenNextWeekBtn:true,
				weekSpanText:'本周',
				currentDay:'',
				currentWeekStartDay:''
			}
		},
		mounted(){
			let dtTime=new Calendar();
			this.currentDay=dtTime.nowDay;
			this.dates=dtTime.getNowWeekDates();
			this.currentWeekStartDay=this.startDate=dtTime.getWeekStartDate();
			this.endDate=dtTime.getWeekEndDate();
			this.getGluList(this.startDate,this.endDate);
		},
		filters:{
			addDecimal(num) {
				if (num != "" && num != null) {
					return Number(num).toFixed(1);
				}
			},
		},
		methods: {
			gluListInit(){
				this.gluList=[];
				for(let i=0;i<7;i++){
					this.gluList.push(this.gluListModel)
				}
			},
			getMealsName(val){
				return getMealsName(val)
			},
			prevWeek(){
				let dtTime=new Calendar();
				dtTime.nowDay=this.currentDay-=7;
				this.dates =dtTime.getNowWeekDates();
				this.startDate=dtTime.getWeekStartDate();
				this.endDate=dtTime.getWeekEndDate();
				
				this.getGluList(this.startDate,this.endDate)
				this.hiddenNextWeekBtn=false;
				this.weekSpanText=this.dates[0].text + "~" + this.dates[6].text;
			},
			nextWeek(){
				let dtTime=new Calendar();
				dtTime.nowDay=this.currentDay+=7;
				this.dates = dtTime.getNowWeekDates();
				this.startDate=dtTime.getWeekStartDate();
				this.endDate=dtTime.getWeekEndDate();
				this.getGluList(this.startDate,this.endDate);
				this.weekSpanText=this.dates[0].text + "~" + this.dates[6].text;
				if (this.startDate == this.currentWeekStartDay) {
					this.hiddenNextWeekBtn=true;
					this.weekSpanText="本周";
				}
			},
			getGluTip(meal,info){
				let tip={
					pid:null, // 随机数据备注id
					time:null, //血糖记录时间
					date:null, //血糖记录日期
					code:null, //血糖记录等级
					concent:null, //血糖值
					tip:null, //血糖记录备注
					meal:null, //血糖记录所在时间段值
				},that=this,datDay=formatDate(new Date(info['date']));
				if(meal==18){
					getRadomTips({measureTime:info['date']}).then(res=>{
						let result;
						if(res.code==0){
							result=res.data;
							that.tips=[];
							for(let i=0;i<result.length;i++){
								tip={
									pid: result[i].pid,
									time: formatTime(new Date(result[i].measureTime)),
									date: formatDate(new Date(result[i].measureTime)),
									code: result[i].levelCode,
									concent: result[i].bloodGlucose,
									tip: result[i].remark,
									meal: result[i].mealsTimes,
								}
								that.$set(that.tips,i,tip)
							}
						}
					})
				}else{
					let mealName=getMealsName(meal);
					tip.code=info[mealName+'Code'];
					tip.tip=info[mealName+'Remark']
					tip.concent=info[mealName];
					tip.meal=meal;
					tip.time=getMealsNameCN(meal);
					tip.date=datDay;
					this.tips=[];
					tip.concent?this.tips.push(tip):'';
					
				}
				this.changeTdActive(datDay,meal)
			},
			changeTdActive(date,meal){
				this.activeClass=[date,meal].toString()
			},
			getGluList(std,end){
				let data={
					startDate:std,
					endDate:end
				},that=this;
				that.gluListInit();
				getGluList(data).then(res=>{
					if(res.code==0){
						let lastData=res.data[res.data.length-1];
						let meal;
						
						if(lastData){
							for(let i=that.mealArray.length-1;i>=0;i--){
								if(lastData[getMealsName(that.mealArray[i])]){
									meal=that.mealArray[i];
									break;
								}
							}
						}else{
							lastData=that.gluListModel;
						}
						meal=meal?meal:18;
						that.getGluTip(meal,lastData)
						that.pushGlu(res.data);
					}
				})
			},
			pushGlu(result,index){
				let dat,
				i=index?(++index):0;
				if(result.length>=1){
					dat=formatDate(new Date(result[0].date));
					for(let j=i;j<this.dates.length;j++){
						if(this.dates[j].text==dat){
							this.$set(this.gluList,j,result[0])
							result=result.splice(1,result.length-1);
							this.pushGlu(result,i);
							return ;
						}
					}
				}
			},
			toRecord(item, k) {
				var that = this;
				this.dataRe = {
					code: item.code,
					date: item.date,
					cont: item.concent,
					text: item.tip,
					meal: item.meal,
					index: k
				}
				if (item.meal == 18) {
					that.$set(that.dataRe, 'time', item.date.replace(/\-/g, '\/') + ' ' + item.time);
					that.$set(that.dataRe,'pid',item.pid);
					that.ismain = false;
				} else {
					getTipData({mealsTimes:item.meal,measureTime:new Date(item.date).getTime()})
					.then(res=>{
						var time;
						that.ismain = false;
						if (res.data) {
							time = formatTime(new Date(res.data.measureTime));
						} else {
							time = '';
						}
						that.$set(that.dataRe, 'time', item.date.replace(/\-/g, '\/') + ' ' + time);
					})
				}
			},
			del() {
				var that = this;
				var redata={
					"mealsTimes": that.dataRe.meal,
					"measureTime": new Date(that.dataRe.date).getTime()
				}
				if(that.dataRe.meal==18){
					redata.pid=that.dataRe.pid;
				}
				mui.confirm('', '确定要删除？', function (val) {
					if (val.index === 1) {
						delGlu(redata).then(res=>{
							if (res.code === '0') {
								mui.toast('删除记录成功');
								that.getGluList(that.startDate, that.endDate);
								setTimeout(function () {
									that.ismain = true;
								}, 1000)
							}	
						})
					}
				})
			},
			save() {
				var that = this;
				var redata={
						"mealsTimes": that.dataRe.meal,
						"measureTime": new Date(that.dataRe.date).getTime(),
						"remark": that.dataRe.text?that.dataRe.text:''
					}
				if(that.dataRe.meal==18){
					redata.pid=that.dataRe.pid;
				}
				saveGlu(redata).then(res=>{
					if (res.code === '0') {
						mui.toast('保存信息成功');
						that.getGluList(that.startDate, that.endDate);
						setTimeout(function () {
							that.ismain = true;
						}, 1000)
					}else{
						mui.toast('保存失败');
					}
				})
			},
			back() {
				this.ismain = true;
			}
		}
	}
</script>

<style scoped>
 .record-his-main{
	 background-color:#fff;
 }
</style>
