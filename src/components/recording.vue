<template>
	<div class="canvas-content">
		<canvas ref='canvasBg' :width="canvasSize" :height="canvasSize"></canvas>
		<canvas ref="canvasId" :width="canvasSize" :height="canvasSize"></canvas>
		<div id="gluval">
			<span class="pan_logo"></span>
			<input type="number" name="inputGlu" autofocus oninput="if(value.length>4)value=value.slice(0,4)" @change="changeVal" id="inputGlu" v-model='val'
			/>
			<span class="danwei">mmol/L</span>
		</div>
	</div>
</template>
<script>
	import {getRecordMeals,getLevel} from './../assets/js/common'
	import lanpan from '../../static/image/lanpan.png'
	import jupan from '../../static/image/jupan.png'
	import hongpan from '../../static/image/hongpan.png'
	export default {
		data() {
			return {
				canvasSize:186,
				ox: 93,
				oy: 93,
				or: 75,
				br: 8,
				br1: 12,
				val: 6.0,
				moveFlag: false,
				canvas: null,
				ctx: null,
				level:null,
				canvasBgCtx:null,
				bgImgs:[lanpan,
						jupan,
						hongpan,
				],
				selectImg:lanpan,
			}
		},
		props: ["meal"],
		computed:{
			img(){
				let img=new Image();
				img.src=this.selectImg;
				return img;
			}
		},
		watch:{
			meal:function(){
				
				console.log(meal,'2123')
			}
		},
		mounted() {
			let canvasBg=this.$refs.canvasBg;
			this.canvasBgCtx=canvasBg.getContext("2d");
			this.canvas = this.$refs.canvasId;
			this.ctx = this.canvas.getContext("2d");
			let on = ("ontouchstart" in document) ? {
						start: "touchstart",
						move: "touchmove",
						end: "touchend"
					} : {
						start: "mousedown",
						move: "mousemove",
						end: "mouseup"
					},
					imgObj=[],
					that=this;
			
			for(var i=0;i<this.bgImgs.length;i++){
				imgObj[i]= new Image();
				imgObj[i].src=this.bgImgs[i];
			}
			imgObj[0].onload=function(){
				that.canvasBgCtx.drawImage(that.img, 0, 0,186,186);
			}
			this.draw(6.0 / 30);
			this.canvas.addEventListener(on.start, this.cvsTouchStart, {
				passive: true
			});
			this.canvas.addEventListener(on.move, this.cvsTouchMove, {
				passive: true
			});
			this.canvas.addEventListener(on.end, this.cvsTouchEnd, {
				passive: true
			});

		},
		watch:{
			'meal':function(){
				this.changeLevelImg();
			},
			'selectImg':function(){
				let that=this;
				that.img.onload=function(){
					
					that.canvasBgCtx.clearRect(0, 0,that.canvasSize, that.canvasSize);	
					that.canvasBgCtx.drawImage(this, 0, 0,that.canvasSize, that.canvasSize);
				}
			}
		},
		methods: {
			changeVal(){
				this.val=this.val>=30?30.0:this.val==''?0.0:Number(this.val).toFixed(1);
				this.changeLevelImg()
			},
			changeLevelImg(){
				this.level = getLevel(this.meal, this.val);
				if (this.level == "FPG001" || this.level == "FPG002"&&this.selectImg!=this.bgImgs[2]) {
					this.selectImg=this.bgImgs[2]
				}else if (this.level == "FPG003"&&this.selectImg!=this.bgImgs[0]) {
					this.selectImg=this.bgImgs[0]
				} else if ((this.level == "FPG004" || this.level =="FPG005" || this.level == "FPG006")&&this.selectImg!=this.bgImgs[1]) {
					this.selectImg=this.bgImgs[1]
				}
			},
			cvsTouchStart(e) {
				this.moveFlag = true;
			},
			cvsTouchMove(e) {
				if (this.moveFlag) {
					var k = this.getXY(e, this.canvas);
					var r = Math.atan2(k.x - this.ox, this.oy - k.y);
					this.changeLevelImg()
					this.draw((r) / (2 * Math.PI));
				}
			},
			cvsTouchEnd(e) {
				this.moveFlag = false;
			},
			offset(r, d) { //根据弧度与距离计算偏移坐标
				return {
					x: -Math.sin(r - Math.PI) * d,
					y: Math.cos(r - Math.PI) * d
				};
			},
			draw(n) {		
				this.ctx.clearRect(0, 0,this.canvasSize, this.canvasSize);	
				this.ctx.strokeStyle = "rgba(255,255,255,.3)";
				this.ctx.lineWidth = 12;
				this.ctx.beginPath();
				this.ctx.arc(this.ox, this.oy, this.or, 0, 2 * Math.PI, true);
				this.ctx.stroke();
				this.ctx.strokeStyle = "#fff";
				this.ctx.lineWidth = 12;
				this.ctx.beginPath();
				this.ctx.arc(this.ox, this.oy, this.or, -0.5 * Math.PI, (n * 2 - 0.5) * Math.PI, false);
				this.ctx.stroke();
				this.ctx.fillStyle = "#fff";
				this.ctx.beginPath();
				var d = this.offset(n * 2 * Math.PI, this.or);
				this.ctx.arc(this.ox + d.x, this.oy + d.y, this.br, 0, 2 * Math.PI, true);
				this.ctx.fill();
				this.val = Math.round(n * 100) > 0 ? (Math.round(n * 100) / 100 * 30).toFixed(1) : (30 + Math.round(n * 100) / 100 * 30).toFixed(1);
				this.ctx.fillStyle = "rgba(255,255,255,.3)";
				this.ctx.beginPath();
				this.ctx.arc(this.ox + d.x, this.oy + d.y, this.br1, 0, 2 * Math.PI, true);
				this.ctx.fill();
				this.ctx.save();
			},
			getXY(e, obj) {
				var et = e.touches ? e.touches[0] : e;
				var x = et.clientX;
				var y = et.clientY;
				return {
					x: x - obj.offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft),
					y: y - obj.offsetTop + (document.body.scrollTop || document.documentElement.scrollTop)
				}
			}


		}
	}
</script>
<style lang="less">
	.canvas-content{
			position: relative;
			canvas{
				position: absolute;
				left: 0;top: 0;
			}
	}
	
</style>
