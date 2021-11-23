import web3 from './web3';

export const convertToEther = (amount: any) => {
	return web3.utils.fromWei(amount, 'ether');
};

export const convertToWei = (amount: any) => {
	return web3.utils.toWei(amount, 'ether');
};

const getMonthFromNumber= (monthNumber:any)=> {
return parseInt(monthNumber)===1 ? "January" : parseInt(monthNumber)===2 ? "February" : parseInt(monthNumber)===3 ? "March" : parseInt(monthNumber)===4 ? "April" : parseInt(monthNumber)===5 ? "May" : parseInt(monthNumber)===6 ? "June": parseInt(monthNumber)===7 ? "July": parseInt(monthNumber)===8 ? "August": parseInt(monthNumber)===9 ? "September": parseInt(monthNumber)===10 ? "October": parseInt(monthNumber)===11 ? "November": parseInt(monthNumber)===12 ? "December": "Invalid month"
}

export const dateFromTimestamp = (timestamp:number) => {//timestamp in microseconds
	// let dateFormat = new Date(timestamp * 1000);
	let dateFormat = new Date(timestamp);
	let month = dateFormat.getMonth() + 1;
	if(month < 10) month = parseFloat("0"+ month);
	let day = dateFormat.getDate();
	if(day < 10) day = parseFloat("0"+ day);
	let year = dateFormat.getFullYear();
	return day + " " + getMonthFromNumber(month).slice(0,3) + " " + year; 
} 
export const yearFromTimestamp = (timestamp:number) => {//timestamp in microseconds
	// let dateFormat = new Date(timestamp * 1000);	
	let dateFormat = new Date(timestamp);
	let year = dateFormat.getFullYear();
	return year; 
}  
export const monthFromTimestamp = (timestamp:number) => {//timestamp in microseconds
	// let dateFormat = new Date(timestamp * 1000);	
	let dateFormat = new Date(timestamp);
	let month = dateFormat.getMonth() + 1;
	if(month < 10) month = parseFloat("0"+ month);
	return month; 
}  
export const dayFromTimestamp = (timestamp:number) => {//timestamp in microseconds
	// let dateFormat = new Date(timestamp * 1000);	
	let dateFormat = new Date(timestamp);
	let day = dateFormat.getDate();
	if(day < 10) day = parseFloat("0"+ day);
	return day; 
}   
export const pad = (num:number) => ("0" + num).slice(-2);

export const timeFromTimestamp = (timestamp:number) => {//timestamp in microseconds
	// const date = new Date(timestamp * 1000);
	const date = new Date(timestamp);
	let hours = date.getHours(),
	minutes = date.getMinutes(),
	seconds = date.getSeconds();
	return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds) 
} 
export const dateToTimestamp = (date:any) => {
	return Date.parse(date);
//    return new Date(date).getTime()
}