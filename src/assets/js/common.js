export const getRecordMeals= meal =>{
	let mealtime;
	if(meal == "17") {
		mealtime = "0";
	} else if(meal == "10" || meal == "12" || meal == "14") {
		mealtime = "1";
	} else if(meal == "11" || meal == "13" || meal == "15" || meal == "18") {
		mealtime = "2";
	} else if(meal == "16") {
		mealtime = "3";
	}
	return Number(mealtime);
}
