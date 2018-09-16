<template>
	<div>
			<div class="tb-record">
				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
						<th rowspan="1" class="bg-f4f4f4" style="color:#efefef;background: #efefef;width: 20%;">日期</th>
						<th rowspan="1" style="color: #666666;font-size: 17px;width: 25%;font-weight: normal;">推荐值</th>
						<th rowspan="1" class="bg-f4f4f4" style="color: #666666;font-size: 17px;width: 55%;font-weight: normal;">目标值</th>
					</tr>
					<tr v-for="(item,k) in dataList">
						<td style="background: #efefef;color: #666666;font-size: 17px;">{{item.goalName}}</td>
						<td>{{Number(item.recommendValueFloor).toFixed(1)}}-{{Number(item.recommendValueUpper).toFixed(1)}}</td>
						<td>
							<input :disabled="isdisabled" v-model.number="sugarTarget[k].recordValueFloor" @change="val1(k)"
								type="number" class="lownum" style="height: 30px;background: #f1f1f1;border: 1px solid #CCCCCC;padding:0px 8px;max-width: 60px;margin: 5px;border-radius: 5px;"
							/>
							<span style="width: 10px;display: inline-block;">-</span>
							<!-- :value="Number(item.recommendValueUpper).toFixed(1)" -->
							<input :disabled="isdisabled"  v-model.number="sugarTarget[k].recordValueUpper" type="number" @change="val2(k)"
								style="height: 30px;background: #f1f1f1;border: 1px solid #CCCCCC;padding:0px 8px;max-width: 60px;margin: 5px;border-radius: 5px;"
							/>
						</td>
					</tr>
				</table>
			</div>
			<div style="text-align: center;height: 120px;padding-top: 20px; auto">
				<button style="width: 50%;height: 40px;background:#50A7F4;border-radius: 20px;color: #FFFFFF;"  @tap="saveBtnClick"
					id="savaBtn">保存</button>
				<button style="width: 50%;height: 40px;background:none;border-radius: 20px;color: #50A7F4;margin-top: 15px;border-color: #50A7F4;" onclick="history.go(-1)">返回</button>
			</div>
			<div style="margin-top: 20px;padding: 10px;">
				<div style="text-align: center;font-size: 16px;color: #333333;font-family: PingFangSC-Medium;">温馨提示</div>
				<p style="font-size: 14px;padding-top: 5px;line-height: 22px;font-family: PingFang-SC-Medium;">
					1.推荐值是根据年龄、糖尿病类型等个人信息智能分析出的最适合您的个性化控糖目标，您可以
					<a style="color:#50A7F4;text-decoration: underline;" @tap="goUserInfo" href="javascript:void(0);">完善个人资料</a>,以获得准确的推荐值。也可以根据医生建议修改您的控糖目标。
					<br />2.血糖控制目标应该根据个体差异定制化，要兼顾控糖的最大获益和存在的低血糖等风险问题。如出现频繁低血糖或无症状低血糖时，应放宽血糖的控制目标。
					<br />以上数据内容仅供参考，不能作为诊断或治疗依据。
	
				</p>
			</div>
			
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex"
	import {getUserGLuList,updateGoal} from '../../service/getData.js'
	export default {
		data(){ 
			return {
				dataList: [],
				val:'',
				isdisabled:false,
				tt:100,
				sugarTarget:[]
			}
		},
		computed:{
			...mapState(['userInfo','GluList'])
		},
		mounted(){
			this.userInfo.isCare==1?this.isdisabled=true:this.isdisabled=false;
			this.gluList();
		},
		methods:{
			...mapActions(['changeGLuList']),
			val2:function(a){
				if (!(/^[0-9]+.?[0-9]*$/).test(this.sugarTarget[a].recordValueUpper)) {
					mui.toast("请输入数字");
					return;
				} else {
					if (Number(this.sugarTarget[a].recordValueUpper) > 30) {
						mui.toast("血糖值不能大于30");
						return;
					} else {
						this.sugarTarget[a].recordValueUpper=Number(this.sugarTarget[a].recordValueUpper).toFixed(1);
					}
				}
			},
			val1:function(b){
				if (!(/^[0-9]+.?[0-9]*$/).test(this.sugarTarget[b].recordValueFloor)) {
					mui.toast("请输入数字");
					return;
				} else {
					if (Number(this.sugarTarget[b].recordValueFloor) > 30) {
						mui.toast("血糖值不能大于30");
						return;
					} else {
						this.sugarTarget[b].recordValueFloor=Number(this.sugarTarget[b].recordValueFloor).toFixed(1);
					}
				}
			},
			gluList(){
				let itemDict;
				if(!this.GluList){
					let that=this;
					getUserGLuList().then(res=>{
						if(res.code==0){
							this.changeGLuList(res.data);
							let data=res.data;
							that.dataList = data;
							for(let j=0;j<that.dataList.length;j++){
								itemDict={
									"pid": that.dataList[j].pid,
									"recordValueFloor": Number(that.dataList[j].recordValueFloor).toFixed(1),
									"recordValueUpper": Number(that.dataList[j].recordValueUpper).toFixed(1)
								}
								that.sugarTarget.push(itemDict)
							}
						}
							
					})		
				}else{
					for(let i=0;i<this.GluList.length;i++){
						this.dataList.push(this.GluList[i]);
						itemDict={
							"pid": this.GluList[i].pid,
							"recordValueFloor": Number(this.GluList[i].recordValueFloor).toFixed(1),
							"recordValueUpper": Number(this.GluList[i].recordValueUpper).toFixed(1)
						}
						this.sugarTarget.push(itemDict)
					}
				}
				
			},
			saveBtnClick(){
				updateGoal(this.sugarTarget).then(res=>{
					mui.toast(res.msg);
				})
				
			},
			goUserInfo(){
				this.$router.replace('/user_info')
			}
		
		}
	}
</script>

<style scoped>
.tb-record table {
	width: 100%;
	text-align: center;
	border-right: 1px solid #E1E1E1;
	border-bottom: 1px solid #E1E1E1;
}

.tb-record table th {
	font-size: 14px;
	color: #666666;
	text-align: center;
	border-top: 1px solid #E1E1E1;
	border-left: 1px solid #E1E1E1;
	padding: 5px 0;
	height: 45px;
}

.tb-record table td {
	height: 45px;
	width: 11.11%;
	font-size: 14px;
	border-top: 1px solid #E1E1E1;
	border-left: 1px solid #E1E1E1;
	position: relative;
}
</style>