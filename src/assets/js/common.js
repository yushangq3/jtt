import store from './../../store'
import {getGluList} from './../../service/getData'


/**
 * 格式化日期
 * @param {Date} date
 * @return yyyy-MM-dd
 */
export const formatDate=(date)=>{
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();

	if(mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if(myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return(myyear + "-" + mymonth + "-" + myweekday);
}

export const formatTime=(date)=>{
	var myHour=date.getHours();
	var mymin=date.getMinutes();
	if(myHour < 10) {
		myHour = "0" + myHour;
	}
	if(mymin < 10) {
		mymin = "0" + mymin;
	}
	return(myHour + ":" + mymin);
}

/*
*获取本周、本季度、本月、上月的开始日期、结束日期
* 
*/

export class Calendar {
	
	constructor(){
		let now = new Date(), //当前日期
				lastMonthDate = new Date();//上月日期
		lastMonthDate.setDate(1);
		lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
		this.nowDayOfWeek = now.getDay()===0?7:now.getDay(); //今天本周的第几天
		this.nowDay = now.getDate(); //当前日
		this.nowMonth = now.getMonth(); //当前月
		this.nowYear = now.getYear(); //当前年
		this.nowYear += (this.nowYear < 2000) ? 1900 : 0; //
		this.timeStamp=now.getTime();
		this.lastYear = lastMonthDate.getYear();
		this.lastMonth = lastMonthDate.getMonth();
	}
	//获得某月的天数
	getMonthDays(myMonth) {
		let monthStartDate = new Date(this.nowYear,myMonth, 1);
		let monthEndDate = new Date(this.nowYear, myMonth + 1, 1);
		let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
		return days;
	}
	
	//获得本季度的开始月份
	getQuarterStartMonth() {
		let quarterStartMonth = 0;
		if(nowMonth < 3) {
			quarterStartMonth = 0;
		}
		if(2 < this.nowMonth && this.nowMonth < 6) {
			quarterStartMonth = 3;
		}
		if(5 < this.nowMonth && this.nowMonth < 9) {
			quarterStartMonth = 6;
		}
		if(this.nowMonth > 8) {
			quarterStartMonth = 9;
		}
		return quarterStartMonth;
	}
	
	//获得本周的开始日期
	getWeekStartDate() {
		let weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek + 1);
		return formatDate(weekStartDate);
	}
	
	//获得本周的结束日期
	getWeekEndDate() {
		var weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay + (7 - this.nowDayOfWeek));
		return formatDate(weekEndDate);
	}
	
	//获取本周周日期
	getNowWeekDates() {
		let nowWeekDate = [],dat,month,day,year;
		for(var i = 1; i <= 7; i++) {
			dat=new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek + i);
			month = dat.getMonth() < 9 ? "0" + Number(dat.getMonth() + 1) : Number(dat.getMonth() + 1);
			day = dat.getDate() < 10 ? "0" + dat.getDate() : dat.getDate();
			year=dat.getFullYear();
			nowWeekDate.push({
				"month": month,
				"day": day,
				"text": year + "-" + month + "-" + day
			});
		}
		return nowWeekDate;
	}
	
	//获得上周的开始日期
	getLastWeekStartDate() {
		var weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek - 7);
		return formatDate(weekStartDate);
	}
	//获得上周的结束日期
	getLastWeekEndDate() {
		var weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek - 1);
		return formatDate(weekEndDate);
	}
	
	//获得下周的开始日期
	getNextWeekStartDate() {
		var weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay + 7 - this.nowDayOfWeek + 1);
		return formatDate(weekStartDate);
	}
	//获得下周的结束日期
	getNextWeekEndDate() {
		var weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek + 15);
		return formatDate(weekEndDate);
	}
	
	//获得本月的开始日期
	getMonthStartDate() {
		var monthStartDate = new Date(this.nowYear, this.nowMonth, 1);
		return formatDate(monthStartDate);
	}
	
	//获得本月的结束日期
	getMonthEndDate() {
		var monthEndDate = new Date(this.nowYear, this.nowMonth, getMonthDays(this.nowMonth));
		return formatDate(monthEndDate);
	}
	
	//获得上月开始时间
	getLastMonthStartDate() {
		var lastMonthStartDate = new Date(this.nowYear, this.lastMonth, 1);
		return formatDate(lastMonthStartDate);
	}
	
	//获得上月结束时间
	getLastMonthEndDate() {
		var lastMonthEndDate = new Date(this.nowYear, this.lastMonth, getMonthDays(this.lastMonth));
		return formatDate(lastMonthEndDate);
	}
	
	//获得本季度的开始日期
	getQuarterStartDate() {
	
		var quarterStartDate = new Date(this.nowYear, getQuarterStartMonth(), 1);
		return formatDate(quarterStartDate);
	}
	
	//或的本季度的结束日期
	getQuarterEndDate() {
		var quarterEndMonth = getQuarterStartMonth() + 2;
		var quarterStartDate = new Date(this.nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
		return formatDate(quarterStartDate);
	}
}



//获取地址栏url 参数 
export const getPara=(testStr)=>{
	var returnPara;
	var url = window.location.href;
	var parameter = url.substring(url.indexOf('?') + 1).split('&');
	for(var i = 0; i < parameter.length; i++) {
		if(testStr.test(parameter[i])) {
			returnPara = parameter[i];
			break;
		}
	}
	if(returnPara) {
		let para=returnPara.substring(returnPara.lastIndexOf("=") + 1, returnPara.length);
		if(para.indexOf('#/')>0){
			return para=para.substring(0,para.indexOf('#/'))
		}
		return para;
	}
}

//判断 { }是否为空
export const isEmptyObject=(obj)=>{
  for(var key in obj){
	   return false
  };
  return true
}


/* -------------------business --------------- */
//血糖时间段 转换
export const getRecordMeals= meal =>{
	let mealtime;
	meal=Number(meal)
	if(meal == 17) {
		mealtime = 0;
	} else if(meal == 12 || meal == 14) {
		mealtime = 1;
	} else if(meal == 11 || meal == 13 || meal == 15 || meal == 18) {
		mealtime = 2;
	} else if(meal == 16) {
		mealtime = 3;
	}else if(meal == 10){
		mealtime = 4;
	}
	return mealtime;
}
export const getMealsNameCN= meal =>{
	let mealname;
	meal=Number(meal);
	switch (meal){
		case 17:
			mealname='凌晨';
		break;
		case 10:
			mealname='空腹';
		break;
		case 11:
			mealname='早餐后';
		break;
		case 12:
			mealname='午餐前';
		break;
		case 13:
			mealname='午餐后';
		break;
		case 14:
			mealname='晚餐前';
		break;
		case 15:
			mealname='晚餐后';
		break;
		case 16:
			mealname='睡前';
		break;
		case 18:
			mealname='随机';
		break;
	}
	return mealname;
}
export const getMealsName= meal =>{
	let mealname;
	meal=Number(meal);
	switch (meal){
		case 17:
			mealname='beforeDawn';
		break;
		case 10:
			mealname='beforeBreakfast';
		break;
		case 11:
			mealname='afterBreakfast';
		break;
		case 12:
			mealname='beforeLanch';
		break;
		case 13:
			mealname='afterLanch';
		break;
		case 14:
			mealname='beforeDinner';
		break;
		case 15:
			mealname='afterDinner';
		break;
		case 16:
			mealname='beforeBed';
		break;
		case 18:
			mealname='random';
		break;
	}
	return mealname;
}
/**
 * 获取血糖等级值
 * @param {0,1,2,3,4} mealTime
 * @param {number} val
 */
export const getLevel=(mealTime, val)=>{
	let levelCode;
	let isCare=localStorage.getItem('isCare');
	let gluList=store.state.GluList;
	let meal=getRecordMeals(mealTime);
	
	if(gluList){
		for(let i = 0; i < gluList.length; i++) {
			if(!gluList[i].recordValueFloor){
				gluList[i].recordValueFloor=4.0
			}
			if(!gluList[i].recordValueUpper){
				gluList[i].recordValueUpper=6.0
			}
			switch (meal) {
				case 0: //凌晨
					if(gluList[i].goalName=='凌晨'){
						if(val<gluList[i].recordValueFloor){
							levelCode='FPG001'
						}else if(val>gluList[i].recordValueUpper){
							levelCode='FPG006'
						}else{
							levelCode='FPG003'
						}
					}
				break;
				case 4: //空腹
					if(gluList[i].goalName=='空腹'){
						if(val<gluList[i].recordValueFloor){
							levelCode='FPG001'
						}else if(val>gluList[i].recordValueUpper){
							levelCode='FPG006'
						}else{
							levelCode='FPG003'
						}
					}
				break;
				case 1: //餐前
					if(gluList[i].goalName=='餐前'){
						if(val<gluList[i].recordValueFloor){
							levelCode='FPG001'
						}else if(val>gluList[i].recordValueUpper){
							levelCode='FPG006'
						}else{
							levelCode='FPG003'
						}
					}
				break;
				case 2: //餐后
					if(gluList[i].goalName=='餐后'){
						if(val<gluList[i].recordValueFloor){
							levelCode='FPG001'
						}else if(val>gluList[i].recordValueUpper){
							levelCode='FPG006'
						}else{
							levelCode='FPG003'
						}
					}
				break;
				case 3: //睡前
					if(gluList[i].goalName=='睡前'){
						if(val<gluList[i].recordValueFloor){
							levelCode='FPG001'
						}else if(val>gluList[i].recordValueUpper){
							levelCode='FPG006'
						}else{
							levelCode='FPG003'
						}
					}
				break;
			}
		}
	}else{
		levelCode="FPG003";
	}
	
	return levelCode;
}

export const getRange=(mealTime)=>{
	let lowest=4.0,heightest=6.0;
	let targetGLuList=store.state.GluList;
	let meal=getRecordMeals(mealTime);
	if(targetGLuList){
		for(var i = 0; i < targetGLuList.length; i++) {
			if(!targetGLuList[i].recordValueFloor){
				targetGLuList[i].recordValueFloor=4.0
			}
			if(!targetGLuList[i].recordValueUpper){
				targetGLuList[i].recordValueFloor=6.0
			}
			switch (meal) {
				case 0: //凌晨
					if(targetGLuList[i].goalName=='凌晨'){
						lowest = targetGLuList[i].recordValueFloor;
						heightest = targetGLuList[i].recordValueUpper;
					}
				break;
				case 4: //空腹
					if(targetGLuList[i].goalName=='空腹'){
						lowest = targetGLuList[i].recordValueFloor;
						heightest = targetGLuList[i].recordValueUpper;
					}
				break;
				case 1: //餐前
					if(targetGLuList[i].goalName=='餐前'){
						lowest = targetGLuList[i].recordValueFloor;
						heightest = targetGLuList[i].recordValueUpper;
					}
				break;
				case 2: //餐后随机
					if(targetGLuList[i].goalName=='餐后'){
						lowest = targetGLuList[i].recordValueFloor;
						heightest = targetGLuList[i].recordValueUpper;
					}
				break;
				case 3: //睡前
					if(targetGLuList[i].goalName=='睡前'){
						lowest = targetGLuList[i].recordValueFloor;
						heightest = targetGLuList[i].recordValueUpper;
					}
				break;
			}
		}
	}
	return [lowest.toFixed(1),heightest.toFixed(1)];
}

/**
 * 根据时间值判断时间段
 * @param {0,1,2,3,4} mealTime
 * @param {number} val
 * @return {number}
 */
export const setMeal=(dt)=>{
	
	let valMealTime,
		startDate=formatDate(new Date()),
		userId=store.state.userId;
	dt=Number(dt);
	if(dt < 500) {
		valMealTime = 17;
	} else if(500 <= dt && dt <= 830) {
		valMealTime = 10;
	} else if(831 <= dt && dt <= 1030) {
		valMealTime = 11;
	} else if(1031 <= dt && dt <= 1300) {
		valMealTime = 12;
	} else if(1301 <= dt && dt <= 1630) {
		valMealTime = 13;
	} else if(1631 <= dt && dt <= 1930) {
		valMealTime = 14;
	} else if(1931 <= dt && dt <= 2130) {
		valMealTime = 15;
	} else if(2131 <= dt && dt <= 2359) {
		valMealTime = 16;
	}
	const getList=getGluList({startDate:startDate,endDate:startDate}).then((res,resove,reject)=>{
		if(res.code==='0'&&res.dataSize>=1){
			let mealName= getMealsName(valMealTime);
			if(res.data[0][mealName]){
				valMealTime=18;
			}
		}
		return valMealTime
	}).catch(error=>{
		return valMealTime
	})
	return getList;
}

//根据餐次 选择 显示 时间
export const setTime=(meal)=>{
	meal=Number(meal);
	switch(meal) {
		case 17:
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "02:30");
			break;
		case 10:
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "06:30");
			break;
		case 11:
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "09:30");
			break;
		case 12:
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "11:30");
			break;
		case 13:
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "14:00");
			break;
		case 14:
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "18:00");
			break;
		case 15:
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "20:00");
			break;
		case 16:
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "22:00");
			break;

	}
}

//显示餐次默认时间
export const MealDefaultTime=(meal)=>{
	var time;
	meal=Number(meal);
	switch(meal) {
		case 10:
			time = "02:30";
			break;
		case 11:
			time = "06:30";
			break;
		case 12:
			time = "09:30";
			break;
		case 13:
			time = "11:30";
			break;
		case 14:
			time = "14:00";
			break;
		case 15:
			time = "18:00";
			break;
		case 16:
			time = "20:00";
			break;
		case 17:
			time = "22:00";
			break;
	}
	return time;
}

