<template>
	<div>
		<div id="tabbar-mine" v-cloak>
			<ul class="mui-table-view mui-table-view-chevron mb10" style="margin-top: 10px;">
				<li class="mui-table-view-cell" id="sexPicker" @tap="changeSex" >
					<span>性别</span>
					<span class="mui-pull-right" id="sexText">{{userInfo.sex==0?"男":"女"}}</span>
					<span class="mui-navigate-right"></span>
				</li>
				<li class="mui-table-view-cell" id="agePicker" @tap="changeAge">
					<span>年龄</span>
					<span class="mui-pull-right"><label id="ageText">{{userInfo.age}}</label> 岁</span>
					<span class="mui-navigate-right"></span>
				</li>
				<li class="mui-table-view-cell" id="heightPicker" @tap="changeHeight">
					<span>身高</span>
					<span class="mui-pull-right"><label id="heightText">{{userInfo.height}}</label> cm</span>
					<span class="mui-navigate-right"></span>
				</li>
				<li class="mui-table-view-cell" id="weightPicker" @tap="changeWeight">
					<span>体重</span>
					<span class="mui-pull-right"><label id="weightText">{{userInfo.weight}}</label> kg</span>
					<span class="mui-navigate-right"></span>
				</li>
				<li class="mui-table-view-cell" id="typePicker" @tap="changeType">
					<span>糖尿病类型</span>
					<span class="mui-pull-right" id="typeText">{{userInfo.diabetesType==0?"无":userInfo.diabetesType==1?"1型糖尿病":userInfo.diabetesType==2?"2型糖尿病":userInfo.diabetesType==3?"妊娠型糖尿病":"糖前期"}}</span>
					<span class="mui-navigate-right"></span>
				</li>
				<li class="mui-table-view-cell" id="labourPicker" @tap="changeLabour">
					<span>劳作强度</span>
					<span class="mui-pull-right" id="labourText">
					{{userInfo.intensity == 0 ? "极轻度(卧床)" : userInfo.intensity==1? "轻度(白领、教师、收银员等)" :userInfo.intensity==2? "中度(学生、电工、医生等)" : "重度(运动员、建筑工、农民等)"}}</span>
					<span class="mui-navigate-right"></span>
				</li>
			</ul>
		</div>
		<div class="wrapper">
			<button class="mui-btn-save" style="margin-top: 40px;" onclick="history.go(-1)">返回</button>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex"
	import heightData from '../../assets/js/height.data.js'
	import weightData from '../../assets/js/weight.data.js'
	import {updateInfo} from '../../service/getData.js'
	import dtpicker from "../../../static/js/mui.picker.min.js"
	export default {
		data(){
			return {
				agePicker:null,
				sexPicker:null,
				weightPicker:null,
				heightPicker:null,
				typePicker:null,
				labourPicker:null
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods:{
			...mapActions(['changeUserInfo']),
			changeAge(){
				let optionsJson = {
					type: "month", //设置日历初始视图模式 
					beginDate: new Date('1917','01','01'), //设置开始日期 
					endDate: new Date(), //设置开始日期 
				};
				let that=this;
				if(!this.agePicker){
					this.agePicker = new mui.DtPicker(optionsJson);
				}
				this.agePicker.show(function(rs) {
					let newAge = new Date().getFullYear() - Number(rs.y.text) + (Number(rs.m.text) > new Date().getMonth() + 1 ? 0 : 1);
					let data={
						weightChanged:0,
						age:String(newAge)
					}
					if(that.userInfo.isCare){
						data.code=that.userInfo.userCode
					}
					updateInfo(data).then(res=>{
						if(res.code==0){
							that.changeUserInfo({age:newAge}),
							that.agePicker.dispose();
							that.agePicker=null;
							mui.toast('修改成功')
						}
					})
				});
			},
			changeSex(){
				if(!this.sexPicker){
					this.sexPicker = new mui.PopPicker();
				}
				let that=this;
				this.sexPicker.setData([{
					value: '0',
					text: '男'
				}, {
					value: '1',
					text: '女'
				}]);
				this.sexPicker.pickers[0].setSelectedValue(that.userInfo.sex);
				this.sexPicker.show(function(items) {
					let data={
						weightChanged:0,
						sex:items[0].value
					}
					if(that.userInfo.isCare){
						data.code=that.userInfo.userCode
					}
					updateInfo(data).then(res=>{
						if(res.code==0){
							that.changeUserInfo({sex:items[0].value}),
							that.sexPicker.dispose();
							that.sexPicker=null;
							mui.toast('修改成功')
						}
					})
				});
				
				           
			},
			changeWeight(){
				if(!this.weightPicker){
					this.weightPicker = new mui.PopPicker({
						layer: 3
					});
				}
				let that=this;
				this.weightPicker.setData(weightData);
				this.weightPicker.pickers[0].setSelectedValue('55', 55);
				this.weightPicker.show(function(items) {
					var weight = items[0].text + "." + items[2].text;
					let data={
						weightChanged:that.userInfo.weight,
						weight:weight
					}
					if(that.userInfo.isCare){
						data.code=that.userInfo.userCode
					}
					updateInfo(data).then(res=>{
						if(res.code==0){
							that.changeUserInfo({weight:weight});
							that.weightPicker.dispose();
							that.weightPicker=null;
							mui.toast('修改成功')
						}
					})
				});
				
							
			},
			changeHeight(){
				if(!this.heightPicker){
					this.heightPicker = new mui.PopPicker();
				}
				let that=this;
				this.heightPicker.setData(heightData);
				this.heightPicker.pickers[0].setSelectedValue('165', 165);
				this.heightPicker.show(function(items) {
					let data={
						weightChanged:0,
						height:items[0].text
					}
					if(that.userInfo.isCare){
						data.code=that.userInfo.userCode
					}
					updateInfo(data).then(res=>{
						if(res.code==0){
							that.changeUserInfo({height:items[0].text})
							that.heightPicker.dispose();
							that.heightPicker=null;
							mui.toast('修改成功')
						}
					})
				});
		
							
			},
			changeType(){
				if(!this.typePicker){
					this.typePicker = new mui.PopPicker();
				}
				let that=this;
				this.typePicker.setData([
					{
						"value": "0",
						"text": "暂无"
					},
					{
						"value": "1",
						"text": "1型"
					}, {
						"value": "2",
						"text": "2型"
					},
					{
						"value": "3",
						"text": "妊娠型"
					}, {
						"value": "4",
						"text": "糖前期"
					}
				]);
				this.typePicker.show(function(items) {
					let data={
						weightChanged:0,
						diabetesType:items[0].value
					}
					if(that.userInfo.isCare){
						data.code=that.userInfo.userCode
					}
					updateInfo(data).then(res=>{
						if(res.code==0){
							that.changeUserInfo({diabetesType:items[0].value});
							that.typePicker.dispose();
							that.typePicker=null;
							mui.toast('修改成功')
						}
					})
				});
							
			},
			changeLabour(){
				if(!this.labourPicker){
					this.labourPicker = new mui.PopPicker();
				}
				let that=this;
				this.labourPicker.setData([
					{
						"value": "0",
						"text": "极轻度(卧床)"
					},
					{
						"value": "1",
						"text": "轻度(白领、教师、收银员等)"
					}, {
						"value": "2",
						"text": "中度(学生、电工、医生等)"
					},
					{
						"value": "3",
						"text": "重度(运动员、建筑工、农民等)"
					}
				]);
				this.labourPicker.show(function(items) {
					let data={
						weightChanged:0,
						intensity:items[0].value
					}
					if(that.userInfo.isCare){
						data.code=that.userInfo.userCode
					}
					updateInfo(data).then(res=>{
						if(res.code==0){
							that.changeUserInfo({intensity:items[0].value});
							that.labourPicker.dispose();
							that.labourPicker=null;
							mui.toast('修改成功')
						}
					})
				});
			}
		}
	}
</script>

<style scoped>

</style>