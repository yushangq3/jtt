<template>
	<div class="mui-content heightAuto">
		<div class="care_title">信息档案</div>
		<div class="careCont" v-cloak>
			<div class="care_tr">
				<div class="label">编号：</div>
				<div class="care_td">
					{{numberId=='undefined'?'':numberId}}
				</div>
			</div>
			<div class="care_tr">
				<div class="label">性别：</div>
				<div class="care_td select">
					<select-option :list="sexs"  :selectedindex="sex" title="请选择您的性别"  @selectval='getsex'></select-option>
				</div>
			</div>
			<div class="care_tr">
				<div class="label">生日：</div>
				<div class="care_td">
					<input type="text" readonly="readonly" unselectable="on" onfocus="this.blur()" @click="showdtpicker" v-model="birthday" placeholder="请输入你的出生日期">
				</div>
			</div>
			<div class="care_tr">
				<div class="label">身高：</div>
				<div class="care_td height">
					<input type="number" readonly="readonly" unselectable="on" onfocus="this.blur()"  @click="showhtpicker" v-model="height" placeholder="请输入您的身高">
					<span>cm</span>
				</div>
			</div>
			<div class="care_tr">
				<div class="label">体重：</div>
				<div class="care_td height">
					<input type="number" readonly="readonly" unselectable="on" onfocus="this.blur()" @click="showwtpicker" v-model="weight" placeholder="请输入您的体重">
					<span>kg</span>
				</div>
			</div>
			<div class="care_tr">
				<div class="label">手机号：</div>
				<div class="care_td">
					<input type="number" v-model="phone" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="请输入您的手机号">
				</div>
			</div>
			<div class="care_tr">
				<div class="label">验证码：</div>
				<div class="care_td vercode" >
					<input type="number" v-model="vercode" oninput="if(value.length>4)value=value.slice(0,4)" placeholder="请输入验证码">
					<span @click='getverifycode'>{{verifybtntext}}</span>
					
				</div>
			</div>
			<div class="care_tr">
				<div class="label">劳动强度：</div>
				<div class="care_td select">
					<select-option :list="labours" :selectedindex="labour" title="请选择您的日常劳动强度"  @selectval='getlabour'></select-option>
				</div>
			</div>
			<div class="care_btn mui-btn active" @click="joinCare" v-if="canNext">下一步</div>
			<div class="care_btn mui-btn" v-else>下一步</div>
		</div>
		
	</div>

</template>

<script>
	import { mapState, mapActions } from "vuex"
	import heightData from '../../assets/js/height.data.js'
	import weightData from '../../assets/js/weight.data.js'
	import {updateInfo,getVerify} from '../../service/getData.js'
	import selectOption from '../../components/selectview'
	import dtpicker from "../../../static/js/mui.picker.min.js"

	export default {
		data(){
			return {
				agePicker:null,
				weightPicker:null,
				heightPicker:null,
				numberId:null,
				birthday:'',
				age:'',
				height:'',
				weight:'',
				phone:'',
				vercode:'',
				verifycode:'',
				sex:0,
				labour:2,
				verifybtntext:'获取验证码',
				canclickverifybtn:true,
				sexs:[{
					value:0,
					text:'男'
				},{
					value:1,
					text:'女'
				}],
				labours:[{
					value:0,
					text:'极轻度（卧床）'
				},{
					value:1,
					text:'轻度（白领、教师、收银员等）'
				},{
					value:2,
					text:'中度（学生、电工、医生等）',
				},{
					value:3,
					text:'重度（运动员、建筑工、农民等）'
				}],
				
			
			} 
		},
		computed:{
			...mapState(['userInfo','openId']),
			canNext:function(){
				if(this.birthday!==''&&this.height!==''&&this.weight!==''&&this.phone!==''&&this.vercode!==''&&this.sex!==''&&this.labour!==''){
					return true;
				}
				return false;
			},
			
		},
		components:{
			selectOption
		},
		mounted:function(){
			let res=this.userInfo,
				code=sessionStorage.getItem('code');
			this.numberId=code;
			this.sex=res.sex?res.sex:0;
			this.weight=res.weight?res.weight:'';
			this.height=res.height?res.height:'';
			this.labour=res.intensity?res.intensity:2;
		},
		methods:{
			getlabour:function(res){
				this.labour=res;
			},
			getsex:function(res){
				this.sex=res
			},
			showdtpicker:function(){
				let that=this;
				if(!this.agePicker){
					let optionsJson = {
							type: "date", //设置日历初始视图模式 
							beginDate: new Date("1917", "01", "01"), //设置开始日期 
							endDate: new Date(), //设置开始日期 
						}
					this.agePicker = new mui.DtPicker(optionsJson);
					this.agePicker.setSelectedValue('2006:01 01');
				}
				this.agePicker.show(function(rs) {
					that.birthday=rs.y.text+'-'+rs.m.text+'-'+rs.d.text;
					let dat=new Date();
					that.age=dat.getFullYear() - Number(rs.y.text) + (Number(rs.m.text) >dat.getMonth() + 1 ? 0 : 1);
					that.agePicker.dispose();
					that.agePicker=null;
				});
			},
			showhtpicker:function(){
				let that=this;
				if(!this.heightPicker){
					this.heightPicker = new mui.PopPicker();
					
					this.heightPicker.setData(heightData);
					this.heightPicker.pickers[0].setSelectedValue('165', 165);
				}
				this.heightPicker.show(function(items) {
					that.height=items[0].text;
					that.heightPicker.dispose();
					that.heightPicker=null;
				});
			},
			showwtpicker:function(){
				let that=this;
				if(!this.weightPicker){
					this.weightPicker = new mui.PopPicker({
							layer: 3
						});
					this.weightPicker.setData(weightData);
					this.weightPicker.pickers[0].setSelectedValue('55', 55);
				}
				
				this.weightPicker.show(function(items) {
					that.weight = items[0].text + "." + items[2].text;
					that.weightPicker.dispose();
					that.weightPicker=null;
				});
			},
			getverifycode:function(){
				var myreg=/^[1][0-9][0-9]{9}$/;
				if(!myreg.test(this.phone)){
					mui.toast('请输入正确手机号');
					return false;
				}
				if(!this.canclickverifybtn){
					return false;
				}
				this.canclickverifybtn=false;
				var that=this;
				getVerify({mobile:that.phone}).then(res=>{
					if(res.code==='0'){
						mui.toast('已成功发送');
						that.verifycode=res.data.verifyCode;
						that.verifybtnshow()
					}else{
						mui.toast('发送失败');
						this.canclickverifybtn=true;
					}
				}).catch(error=>{
					mui.toast('发送失败');
					this.canclickverifybtn=true;
				})
			},
			verifybtnshow:function(){
				var lantime=60;
				this.verifybtntext=lantime+'s';
				var that=this;
				var verifytime=setInterval(function(){
					lantime--;
					that.verifybtntext=lantime+'s';
					if(lantime<=0){
						that.verifybtntext="获取验证码";
						that.canclickverifybtn=true;
						clearInterval(verifytime);
					}
				},1000)
			},
			joinCare:function(){
				let that=this,
					openid=this.openId,
					para={
						sex:this.sex,
						age:this.age,
						openid:openid,
						height:this.height,
						weight:this.weight,
						intensity:this.labour,
						mobile:this.phone,
						diabetesType:1,
						code:this.numberId,
						weightChanged:1
					};
				if(this.vercode!=Number(this.verifycode)){
					mui.toast('请输入正确验证码');
					return false;
				}
				updateInfo(para).then(res=>{
					if(res.code=='0'){
						that.$router.replace('/monitorplan')
					}
				})
			}
		}
	}
</script>

<style scoped>
	@import '../../../static/css/care.css';
	.heightAuto{min-height: 100%;}
</style>