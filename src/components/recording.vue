<template>
	<div class="canvas-content lanpan jupan hongpan">
		<canvas ref="canvasId" width="186" height="186"></canvas>
		<div id="gluval">
			<span class="pan_logo"></span>
			<input type="number" name="inputGlu" autofocus oninput="if(value.length>4)value=value.slice(0,4)" id="inputGlu" v-model='val'/>
			<span class="danwei">mmol/L</span>
		</div>
	</div>
</template>
<script>
	import {getRecordMeals} from './../assets/js/common'
	export default {
		data(){
			return {
				ox : 93,
				oy : 93,
				or : 75,
				br : 8,
				br1 : 12,
				val:6.0,
				moveFlag: false,
				canvas:null,
				ctx:null
			}
		},
		props:["meal"],
		mounted(){
			this.canvas=this.$refs.canvasId;
			this.ctx=this.canvas.getContext("2d");
			var on = ("ontouchstart" in document) ? {
				start: "touchstart",
				move: "touchmove",
				end: "touchend"
			} : {
				start: "mousedown",
				move: "mousemove",
				end: "mouseup"
			};
			this.canvas.addEventListener(on.start,this.cvsTouchStart, {passive:true});
			this.canvas.addEventListener(on.move,this.cvsTouchMove, {passive:true});
			this.canvas.addEventListener(on.end,this.cvsTouchEnd, {passive:true});
		},
		methods:{
			cvsTouchStart (e) {
				this.moveFlag = true;
			},
			cvsTouchMove (e) {
				if (this.moveFlag) {
					var k = this.getXY(e, this.canvas);
					var r = Math.atan2(k.x - this.ox, this.oy - k.y);
					this.draw((r) / (2 * Math.PI));
					var recordMeal=getRecordMeals(this.meal);
					var level = getLevel(recordMeal, this.val);
					getRecordMeals(this.meal, Number($(".glu").text()), level, 'lanpan');
					if (level == "FPG001" || level == "FPG002") {
					} else if (level == "FPG003") {
					} else if (level == "FPG004" || level == "FPG005" || level == "FPG006") {
					} else {
					}
					console.log(level)
				}
			},
			cvsTouchEnd (e) {
				this.moveFlag = false;
			},
			offset(r, d) { //根据弧度与距离计算偏移坐标
				return {
					x: -Math.sin(r - Math.PI) * d,
					y: Math.cos(r - Math.PI) * d
				};
			},
			draw(n) {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
				this.val = Math.round(n * 100) > 0 ? (Math.round(n * 100) / 100 * 30).toFixed(1) : (30 + Math.round(n * 100) / 100 * 30).toFixed(
					1);
				this.ctx.fillStyle = "rgba(255,255,255,.3)";
				this.ctx.beginPath();
				this.ctx.arc(this.ox + d.x, this.oy + d.y, this.br1, 0, 2 * Math.PI, true);
				this.ctx.fill();
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
	
</style>