<template>
	<div class="wrapper" id="weightVueBox">
		<div class="scrollbox">
			<div class="mui-content mui-scroll-wrapper" id='weightRecord' v-cloak>
				<div class="mui-scroll">
					<div class="weightList" v-if="record.length">
						<div class="weight" v-for="(item,k) in record">
							<div class="weight-close" @tap="reduce(k)"></div>
							<div class="mui-clearfix">
								<div class="weight-time">
									{{item.recordTime | formate}}
								</div>
								<div class="weight-data">
									<span>{{item.value}} </span>
									<i v-if="item.value">kg</i>
								</div>
							</div>
							<div class="weight-tip">
								{{item.remark}}
							</div>
						</div>
					</div>
					<div class="weightNo" style="position: absolute;top: 0;left: 0;width: 100%;" v-else>
						<div class="nodata">无数据</div>
					</div>
				</div>
			</div>
			<weight-mask ref="weightDialog" @add='addWeightRecord'></weight-mask>
			<div class="weightAdd">
				<button class="btn weightAddbtn" @tap="addWeight">添加记录</button>
				<button class="mui-btn-save  btn_back" onclick="history.go(-1)">返回</button>
			</div>
		</div>

	</div>
</template>

<script>
	import weightMask from '../../components/weightMask'
	import {weightList,weightDel} from '../../service/getData.js'
	import {formatDate,formatTime} from '../../assets/js/common.js'
	

	export default {
		data(){
			return {
				record: [],
				pageIndex: 1,
				endPull: false
			}
		},
		filters: {
			formate: function (val) {
				if (val) {
					return formatDate(new Date(val)) + ' ' + formatTime(new Date(val)) + ':00';
				} else {
					return '';
				}
			}
		},
		components:{
			weightMask
		},
		mounted: function () {
			let that=this;
			this.getData();
			
			for(var i = mui.hooks.inits.length-1,item;i>=0;i--){
				item=mui.hooks.inits[i];
				if(item.name=="pullrefresh"){
					item.repeat=true;
				}
			}
			mui.init({
				pullRefresh: {
					container: '#weightRecord', //待刷新区域标识
					up: {
						height: 50, //可选.默认50.触发上拉加载拖动距离
						contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
						contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
						callback: function () {
							let m_that = this;
							setTimeout(function () {
								if(that.record.length<=0){
									that.endPull=false;
								}
								that.getData();
								m_that.endPullupToRefresh(that.endPull);
							}, 500);
						}
					}
				}
			});
		},
		
		methods: {
			getData: function () {
				var that = this;
				weightList({
					pageNum:this.pageIndex,
					pageSize:10
				}).then(res=>{
					if (res.code === '0' && res.dataSize >= 1) {
						// that.record=res.data;
						if (res.data.length <= 10) {
							that.endPull = true;
						}
						that.record=that.record.splice(0,(that.pageIndex-1)*10);
						for (var i = 0; i < res.data.length; i++) {
							that.record.push(res.data[i]);
						}
						that.pageIndex++;
					}
				})
			},
			reduce: function (k) {
				var option = this.record[k];
				var that = this;
				mui.confirm('', '确定要删除？', function (val) {
					if (val.index === 1) {
						weightDel({pid:option.pid}).then(res=>{
							if (res.code === '0') {
								that.record.splice(k, 1);
								if(that.record.length<10){
									that.pageIndex=1;
									that.getData();
								}
								mui.toast('删除体重成功')
								if(that.record.length<=0){
									mui("#weightRecord").pullRefresh().endPullupToRefresh(false);
								}
							}
						})
					}
				})
			},
			addWeightRecord: function (res) {
				if (res.code === '0') {
					this.record.unshift(res.data);
					this.pageIndex=Math.ceil(this.record.length/10)+1;
					this.addWeight();
					
				} else {
					mui.toast('添加体重失败')
				}
			},
			addWeight: function () {
				this.$refs.weightDialog.changeStatus()
			}
		}
	}
</script>

<style scoped>
	@import '../../../static/css/weightRecord.css';
</style>
<style>
	.mui-pull-bottom-pocket{background-color: #fff;}
</style>