<template>
	<div id='box'>
		<p class="font12 c-ff5959 mui-text-center pd10-0 m0">天天小帖士：以下信息会影响您的健康标准哦！</p>
		<div class="base_info_box">
			<div class="gender  mui-text-center" v-show="process==1" id="genderBox">
					<p class="c-666 font16" >性别</p>
					<div>
						<input type="radio" name="gender" v-model="sex" value="0" />
						<label for="gender0" class="male">
							<img src="../../../static/image/male_normal.png" class="noCheck">
							<img src="../../../static/image/male_selected.png" class="check" alt="">
							<span>男</span>
						</label>
					</div>
					<div>
						<input type="radio" name="gender" v-model="sex" value="1" />
						<label for="gender1" class="female">
							<img src="../../../static/image/female_normal.png" class="noCheck">
							<img src="../../../static/image/female_selected.png" class="check" alt="">
							<span>女</span>
						</label>
					</div>
			</div>
			<div class="user_info_box" v-show="process==2" id="userInfo">
					<div class="user_birthday base_info_list">
						<span class="icon"></span>
						<input type="text" v-model="dataBirthday" @tap="birthday" placeholder="生日" readonly="readonly" />
					</div>
					<div class="user_height base_info_list">
						<span class="icon"></span>
						<input type="text" v-model="dataHeight" @tap="height" readonly="readonly" placeholder="身高"  />
						<span class="text"  >cm</span>
					</div>
					<div class="user_weight base_info_list">
						<span class="icon"></span>
						<input type="text" v-model="dataWeight" @tap="weight" readonly="readonly" placeholder="体重" />
						<span class="text">kg</span>
					</div>
			</div>
			<div class="diabetesType mb20"  v-show="process==3" >
				<p class="font16 c-333 mb10 mui-text-center">糖尿病类型</p>
				<div class="mui-row chk-type">
					<div class="mui-col-sm-4 mui-col-xs-6">
						<input type="radio" name="type" v-model="diabetesType" id="type1" value="1" />
						<label for="type1">1型糖尿病</label>
					</div>
					<div class="mui-col-sm-4 mui-col-xs-6">
						<input type="radio" name="type" v-model="diabetesType" value="2" />
						<label for="type2">2型糖尿病</label>
					</div>
					<div class="mui-col-sm-4 mui-col-xs-4">
						<input type="radio" name="type" v-model="diabetesType" value="3" />
						<label for="type3">妊娠型</label>
					</div>
					<div class="mui-col-sm-4 mui-col-xs-4">
						<input type="radio" name="type" v-model="diabetesType" value="4" />
						<label for="type4">糖前期</label>
					</div>
					<div class="mui-col-sm-4 mui-col-xs-4">
						<input type="radio" name="type" v-model="diabetesType" value="0" />
						<label for="type5">无</label>
					</div>
				</div>
				<p class="font16 c-333 mb10 mui-text-center" id="labourPicker">劳动强度</p>
				<ul class="chk-labor">
					<li>
						<input type="radio" name="labor" v-model="labor" id="labor0" value="0" />
						<label for="labor0">极轻度（卧床）</label>
					</li>
					<li>
						<input type="radio" name="labor" v-model="labor" id="labor1" value="1" />
						<label for="labor1">轻度（白领、教师、收银员等）</label>
					</li>
					<li>
						<input type="radio" name="labor" v-model="labor" id="labor2" value="2"/>
						<label for="labor2">中度（学生、电工、医生等）</label>
					</li>
					<li><input type="radio" name="labor" v-model="labor" id="labor3" value="3" />
						<label for="labor3">重度（运动员、建筑工、农民等）</label>
					</li>
				</ul>
				<button class="mui-btn mui-btn-save"  @tap="toNext">完成注册</button>
			</div>
		</div>
		
		<button class="mui-btn mui-btn-save" v-if="process!==3"  @tap="toNext">下一步</button>
	
	</div>
</template>

<script>
	import {updateInfo} from '../../service/getData.js'
	import dtpicker from "../../../static/js/mui.picker.min.js"
	import heightData from '../../assets/js/height.data.js'
	import weightData from '../../assets/js/weight.data.js'
	export default {
		data(){
			let nowDate=new Date(),
				nowDateY=nowDate.getFullYear(),
				nowDateM=(nowDate.getMonth()+1<=9?('0'+(nowDate.getMonth()+1)):(nowDate.getMonth()+1)),
				nowDateD=nowDate.getDate()<=9?('0'+nowDate.getDate()):nowDate.getDate();
			return  {
				nowDateY,nowDateM,nowDateD,
				dataBirthday:(nowDateY-45)+'-01-01', 
				dataWeight:55.0,  //身高
				dataHeight:165,  //体重
				birpicker:null,
				wtpicker:null,
				htpicker:null,
				age:45, //年龄
				process:1,
				sex:0,
				diabetesType:2, //糖尿病类型
				labor:2 //劳动强度
			}
		},
		methods:{
			birthday(){
				let that=this;
				if(!this.birpicker){
					let options={
						type:'date',
						beginYear:1917,
						endDate: new Date(),//设置结束日期 
					}
					this.birpicker = new mui.DtPicker(options); 
					this.birpicker.setSelectedValue(this.dataBirthday);
				}
				this.birpicker.show(function (i) { 
					that.dataBirthday=i.y.text+'-'+i.m.text+'-'+i.d.text;
					that.age=that.nowDateY - Number(i.y.text) + (Number(i.m.text) > Number(that.nowDateM) ?0 : Number(i.d.text)>Number(that.nowDateD)? 0:1);
					that.birpicker.dispose();
					that.birpicker=null
				})
			},
			height(){
				let that=this;
				if(!this.htpicker){
					this.htpicker = new mui.PopPicker();
					this.htpicker.setData(heightData);
					this.htpicker.pickers[0].setSelectedValue('165', 165);
					
				}
				this.htpicker.show(function(items) {
					that.dataHeight=items[0].value;
					that.htpicker.dispose();
					that.htpicker=null
				});
			},
			weight(){
				let that=this;
				if(!this.wtpicker){
					this.wtpicker = new mui.PopPicker({
						layer: 3
					});
					this.wtpicker.setData(weightData);
					this.wtpicker.pickers[0].setSelectedValue('55', 55);
					
				}
				this.wtpicker.show(function(items) {
					that.dataWeight=items[0].value+'.'+items[1].value;
					that.wtpicker.dispose();
					that.wtpicker=null
				});
			},
			toNext(){
				let that=this;
					if(this.process===1){
						this.process=2;
					}else if(this.process===2){
						if(!this.dataBirthday||!this.dataWeight||!this.dataHeight){
							mui.toast("信息请填写完整");
							return false;
						}else{
							this.process=3
						}
					}else{
						let data={
							diabetesType:this.diabetesType,
							sex:this.sex,
							age:this.age,
							height:this.dataHeight,
							widght:this.dataWeight,
							intensity:this.labor,
							weightChanged:1
						}
						updateInfo(data).then(res=>{
							if(res.code==0){
								that.$router.replace('/record')
							}
						})
					}
			}
		
		}
	}
</script>

<style scoped>
#box {
	height: 100%;
	width: 100%;
	background: #fff;
}

#value,
#value2,
#value3 {
	text-align: center;
	display: flex;
	justify-content: space-between;
	padding: 0 5% 8px;
	font-size: 16px;
	color: #666;
}



.ruler2 {
	font-size: 20px;
	padding: 10px;
}


.ruler3 {
	font-size: 20px;
	padding: 10px;
}

#box .value,
#box .value2,
#box .value3 {
	color: #43A3F8;
}
</style>