<template>
	<transition :name="transitionName">   
		<router-view></router-view>
    </transition>
</template>
<script>
	export default {
	  name: 'App',
	  data(){
		  return {
			  transitionName:''
		  }
	  },
	  watch: {//使用watch 监听$router的变化
			$route(to, from) {
				// console.log(to.meta.index,from.meta.index)
				//如果to索引大于from索引,判断为前进状态,反之则为后退状态
				if(to.meta.index > from.meta.index){
				//设置动画名称
				this.transitionName = 'slide-left';
				}else if(to.meta.index < from.meta.index){
				this.transitionName = 'slide-right';
				}
			}
	  }
	}
</script>
<style scoped>
	.slide-right-enter-active,
	.slide-right-leave-active,
	.slide-left-enter-active,
	.slide-left-leave-active {
		will-change: transform;
		transition: all 200ms;
		position: absolute;
		top:0;
		left:0;
		width: 100%;
		height: 100%;
	}
	.slide-right-enter {
	  opacity: 0;
	  /* transform: translate3d(-100%, 0, 0); */
	}
	.slide-right-leave-active {
	  opacity: 0;
	  transform: translate3d(100%, 0, 0);
	}
	.slide-left-enter {
	  opacity: 0;
	  transform: translate3d(100%, 0, 0);
	}
	.slide-left-leave-active {
	  opacity: 0;
	  /* transform: translate3d(-100%, 0, 0); */
	}
</style>
