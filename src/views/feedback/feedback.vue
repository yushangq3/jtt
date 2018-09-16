<template>
	<div class="wrapper">
		<textarea name="advice" rows="10" v-model="feed" placeholder="您的任何需求，想法或者建议都可以告诉我们，帮助我们为您提供更好的服务~"></textarea>
		<button class="mui-btn-save"  @tap="saveAdvice">提交</button>
		<button class="mui-btn-save btn_back" onclick="history.go(-1)">返回</button>

	</div>
</template>

<script>
	import {feedback} from '../../service/getData.js'
	export default {
		data(){
			return {
				feed:null
			}
		},
		methods:{
			saveAdvice(){
				let that=this;
				if(feed){
					feedback({content:this.feed}).then(res=>{
						that.$router.replace('/user')
					})
				}else{
					mui.toast('请填写建议')
				}
				
			}
			
		}
	}
</script>

<style scoped>
textarea {
	font-size: 16px;
	color: #333;
	border: none;
	border-top: 1px solid #ccc;
	border-radius: 0;
}
.mui-btn-save,.mui-btn-save.btn_back{width: 50%;}
.mui-btn-save.btn_back{padding: 8px 0;}
</style>