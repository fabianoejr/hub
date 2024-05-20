Date.isLeapYear = function (year) { 
	return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
}

Date.getDaysInMonth = function (year, month) {
	return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

Date.prototype.isLeapYear = function () { 
	var y = this.getFullYear(); 
	return (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0)); 
}

Date.prototype.getDaysInMonth = function () { 
	return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
}

Date.prototype.addMonths = function (value) {
	var n = this.getDate();
	this.setDate(1);
	this.setMonth(this.getMonth() + value);
	this.setDate(Math.min(n, this.getDaysInMonth()));

	var curr_date = this.getDate();
	var curr_month = this.getMonth()+1;
	var curr_year = this.getFullYear();

	curr_date = curr_date<10?"0"+curr_date:curr_date;
	curr_month = curr_month<10?"0"+curr_month:curr_month;

	return curr_date+"/"+curr_month+"/"+curr_year;
}
	
$(document).ready(function() {

});