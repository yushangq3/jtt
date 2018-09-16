<template>
	<div ref="selectview" class="select">
		<input type="text" readonly :placeholder="title" v-model="text" @click="showOption"/>
		<transition name="fade"><div class="care_options"  v-if="isShow">
			<div class="care_options_title">{{title}}</div>
				<div v-for="(item,k) in list" :class="[selectIndex==k?'selected':'','option']" @tap="selected(item,k)">
					{{item.text}}
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				text:'',
				isShow:false,
				selectIndex:0
			}
		},
		props:['list','title','selectedindex'],
		mounted(){
			let that=this;
			if(this.selectedindex>=0){
				var i=this.selectedindex;
				this.selected(this.list[i],i);
			}
			document.addEventListener('click',that.otherTap)
			 
		},
		destroyed(){
			let that=this;
			
			document.removeEventListener('click',that.otherTap)
		},
		watch:{
			selectedindex(){
				if(this.selectedindex>=0){
					var i=this.selectedindex;
					this.selected(this.list[i],i);
				}
			}
		},
		methods:{
			showOption(){
				this.isShow=true
			},
			selected(item,k){
				this.text=item.text;
				this.selectIndex=k;
				this.$emit('selectval',item.value);
				this.isShow=false;
			},
			otherTap(e){
				if(!this.$refs.selectview.contains(e.target)){
					this.isShow=false;
				}
			}
		}
	}
</script>

<style scoped>
	.select{
		position: relative;
		background-image: linear-gradient(0deg, #EDEDED 0%, #F5F5F5 52%, #EDEDED 100%);
		background-position: 100% 50%;
		border-radius: 5px;
	}
	.select input{
		background: none;
		width:100%;
		padding: 0 30px 0 10px;
		height: 35px;
		font-size: 16px;
		line-height: 35px;
		border: 1px solid #CCCCCC;
		border-radius: 5px;
		outline: none;
		margin-bottom: 0;
	}
	.select:after{
		content: '';
		position: absolute;
		width: 10px;
		height: 20px;
		background: url(../../static/image/updown.png) no-repeat 50%;
		background-size: 10px auto;
		right: 10px;
		top: 7px;
	}
	.care_options{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		font-size: 12px;
		line-height: 16px;
		width: 100%;
		padding: 10px 0;
		background-color: #F4F4F4;
		border: 1px solid #CCCCCC;
		border-radius: 5px;
	}
	.care_options .care_options_title{
		color: #ccc;
		padding: 0 0 0 30px;
	}
	.care_options  .option{
		margin: 10px 0;
		padding: 0 0 0 30px;
	}
	.care_options  .option.selected{
		background: url(../../static/image/selected.png) no-repeat 6px 50%;
		background-size: 18px auto;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .4s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
</style>
