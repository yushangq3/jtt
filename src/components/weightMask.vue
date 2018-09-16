<template>
	<div v-show="isShow">
		<div class="weightMask" ref="weightMask"></div>
		<transition name="scale">
			<div class="weight-poput-view mui-popup-in" v-show="isShow">
				<div class="weight-popup ">
					<div class="weight-poput-title">体重记录</div>
					<div class="weight-poput-body mui-clearfix">
						<div class="weight-poput-icon"></div>
						<input type="text" class="Weightnow" readonly unselectable="on" onfocus="this.blur()" v-model="weight" @tap="wtpicker" placeholder="请输入当前体重">
						<div class="weight-poput-unit">kg</div>
					</div>
					<div class="weight-poput-submit weightPoputSubmit">
						<button @tap="weightPush">确认</button>
					</div>
				</div>
				<button class="weight-poput-cancel weightPoputCancel" @click="changeStatus"></button>
			</div>
		</transition>
	</div>
</template>

<script>
	import weightData from '../assets/js/weight.data.js'
	import dtpicker from "../../static/js/mui.picker.min.js"
	import {weightAdd} from "../service/getData.js"
	export default {
		data() {
			return {
				weight: '',
				isShow: false
			}
		},
		methods: {
			weightPush: function () {
				let weight = this.weight,
					that = this;
				if (weight) {
					weightAdd({value:weight}).then(res=>{
						that.$emit('add', res);
					})
				}
			},
			wtpicker: function () {
				let that = this;
				if(!this.weightPicker){
					this.weightPicker = new mui.PopPicker({
						layer: 3
					});
					this.weightPicker.setData(weightData);
					this.weightPicker.pickers[0].setSelectedValue('55', 55);
				}
				this.weightPicker.show(function (items) {
					that.weight = items[0].text + "." + items[2].text;
					that.weightPicker.dispose();
					that.weightPicker=null
				});
			},
			changeStatus: function () {
				this.isShow = !this.isShow;
			}
		}
	}
</script>

<style scoped>

</style>
