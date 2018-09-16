<template>
	<div class="wrap">
		<div id="duoxuanContent" v-show="questionType==1">
			<div id="duoxuan">
				<p class="title">{{questionNum+1+ "." + currentQuestion.title}}</p>
				<div id="searchDuoxuan">
					<template v-for="(item,i) in currentQuestion.options">
						<input type="checkbox" :disabled="isDsiabled" name="danxuaninput" :id="'check_'+ i" class="option-check" :value="i" v-model="selectIndex" />
						<label :for="'check_' + i" >
							{{item.optionTitle}}
						</label>
					</template>
				</div>
			</div>
			<button class="multi-btn-save"  id="saveAdvice"  @tap="next">确认答案</button>
		</div>
		<div id="danxuanContent" v-show="questionType==2">
			<div id="danxuan">
				<p class="title">{{questionNum+1+ "." + currentQuestion.title}}</p>
				<div id="searchDanxuan">
					<template v-for="(item,i) in currentQuestion.options">
						<input 
								type="radio"  
								:id="'radio_'+i"
								name="mode"
								v-model="selectIndex" 
								:value="i" 
								class="option-radio" 
								:disabled="isDsiabled"
						/>
						<label :for="'radio_' + i" >
							{{item.optionTitle}} 
						</label>
					</template>
				</div>
			</div>
			<button class="multi-btn-save"  id="saveAdvice" @tap="next">确认答案</button>
		</div>
		<div id="tiankong" v-show="questionType==3">
			<p class="title">{{questionNum+1+ "." + currentQuestion.title}}</p>
			<textarea name="advice" rows="10" v-model="inputText" placeholder="请输入您加餐的食物名称及分量" oninput="if(value.length>200)value=value.slice(0,200)" id="textContent"></textarea>
			<button class="mui-btn-save"  @tap="next">提交</button>
		</div>
	</div>
</template>

<script>
 import {question,questionSave} from '../../service/getData.js'

	export default {
		props:{
			bldglucosePid: {
			  type: String,
			  default: ''
			}
		 },
		data(){
			return {
				responseDatas :[],
				answers : [],
				questionNum : 0,//显示题号
				optionOrder:0,//后台返回题号
				nextPid:0,//下一题的pid
				timeStamp:new Date().getTime(),
				questionType:null,
				currentQuestion:{}, //当前题目
				questionAns:{},//当前题目用户选择答案
				inputText:'',
				selectIndex:[],
				isDsiabled:false,
				answer:[]
			}
		},
		mounted(){
			let that=this;

			question().then(res=>{
				if(res.code==0){
					that.responseDatas=res.data;
					that.optionOrder=that.responseDatas[0].showOrder;
					that.currentQuestion=that.responseDatas[0]
					that.updateDisplay();
				}
			})
		},
		methods:{
			updateDisplay(){
				let that=this;
				switch(that.currentQuestion.type){
					case 1:
					{
						this.questionType=1;
					}
					break;
					case 2:
					{
						this.questionType=2;
					}
					break;
					case 3:
					{
						this.questionType=3;
					}
					break;
				}
			
			},
			selectNext(selectOption){
				let	questionAns=Object.assign({
							"optionTitle":selectOption.optionTitle,
							"questionnaireOptionPid": selectOption.pid,
							"questionnaireOptionTitle":selectOption.optionTitle
						},this.questionAns)
				this.nextPid=selectOption.nextQuestionnairePid
				this.answers.push(questionAns);
			},
			next(){
				this.questionAns={
					"questionnairePid": this.currentQuestion.pid,
					"questionnaireTitle": this.currentQuestion.title,
					"questionnaireType":this.currentQuestion.type,
					"bldglucosePid":this.bldglucosePid,
				};
				let selectOption=null,that=this;
				switch (this.currentQuestion.type){
					case 3:
						if(!this.inputText){
							mui.toast('请输入内容');
							return false;
						}
						let	questionAns=Object.assign({"inputValue":this.inputText},this.questionAns);
						this.nextPid=this.currentQuestion.options[0].nextQuestionnairePid;
						this.answers.push(questionAns);
						break;
					case 2:
							if(this.selectIndex.length<=0){
								mui.toast('请选择您的选项');
								return false;
							}
							selectOption=this.currentQuestion.options[this.selectIndex];
							this.selectNext(selectOption)
						break;
					case 1:
						if(this.selectIndex.length<=0){
							mui.toast('请选择您的选项');
							return false;
						}
						for(let i=0;i<this.selectIndex.length;i++){
							selectOption = this.currentQuestion.options[this.selectIndex[i]];
							this.selectNext(selectOption)
						}
						break;
				}
				this.isDsiabled=true;
				
				if(this.nextPid=='-1'){
					questionSave(this.answer).then(res=>{
						mui.toast(res.msg);
						that.$router.replace('/bloodsugar');
					})
					return 
				}else{
					for(let j=0;j<this.responseDatas.length;j++){
						if(this.responseDatas[j].pid==this.nextPid){
							this.currentQuestion=this.responseDatas[j];
							break ;
						}
					}
					this.updateDisplay();
					setTimeout(function(){
						this.isDsiabled=false
					}.bind(this),500)
				}
				this.questionNum++;
				this.selectIndex=[];
				
			}
			
		
		}
	}

</script>

<style scoped>
 /* 单选 */

    .option-radio {
        display: none;
    }

    .option-radio+label {
        margin-top: 20px;
        display: block;
        padding-left: 26px;
        background: url(../../../static/image/nocheacked.png) no-repeat left center;
        background-size: 20px 20px;
        /* cursor: pointer; */
    }

    .option-radio:checked+label {
        background: url(../../../static/image/cheacked.png) no-repeat left center;
        background-size: 20px 20px;
    }

    .wrap {
        padding: 15px;
				height: 100%;
				box-sizing: border-box;
				background-color: #fff;
    }
    /* 多选 */

    .option-check {
        display: none;
    }

    .option-check+label {
        margin-top: 20px;
        display: block;
        padding-left: 26px;
        background: url(../../../static/image/muiUncheck.png) no-repeat left center;
        background-size: 20px 20px;
       /* cursor: pointer; */
    }

    .option-check:checked+label {
        background: url(../../../static/image/muiCheck@3x.png) no-repeat left center;
        background-size: 20px 20px;
    }
    /* 填空 */

    textarea {
        width: 100%;
        height: 143px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        padding: 5px;
        background: #ffffff;
        font-size: 16px;
    }

    .mui-btn-save {
        width: 50%;
        height: 40px;
        background: rgb(46, 170, 248);
        border-radius: 20px;
        color: #FFFFFF;
        margin-left: 25%;
				margin-top: 50px;
        font-size: 16px;
    }

    .multi-btn-save {
        width: 50%;
        height: 40px;
        background: rgb(46, 170, 248);
        border-radius: 20px;
        color: #FFFFFF;
        margin-left: 25%;
        margin: 40px 25%;
        font-size: 16px;
    }
		.title{
			font-size:17px ;margin-bottom: 20px;color: #333333;
		}
		label{
			margin-top: 20px;font-size: 16px;color: #333333;
		}
</style>