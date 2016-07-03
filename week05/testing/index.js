"use strict";

const add = str => {
	const basicPattern = /[,\n]/g;
	const escaperPattern = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

	let pattern;
	let negatives = [];

	if(str == "") return 0;

	let array = str.match(/^\/\/(.+)\n/);

	if (array){
		let [{length}, delimArray] = array;
		str = str.slice(length);
		delimArray = delimArray.split(/[\[\]]/).filter(el => el);
		if(delimArray.length>1){
			delimArray.forEach(delim => {
				let ed = delim.replace(escaperPattern, "\\$&");
				pattern = new RegExp(ed, "g");
				str = str.split(pattern).join();
				pattern = basicPattern;
			})
		}
		else{
			let delim = delimArray[0].replace(escaperPattern, "\\$&");
			pattern = RegExp(delim, "g");
		}
	}
	else pattern = /[,\n]/g;

	return str
	.split(pattern)
	.map(num => num == "" ? NaN : Number(num))
	.map(num => {
		if(num<0) negatives.push(num);
		if(num>1000) return 0;
		return num;
	})
	.reduce((acc, cur) => {
		if(negatives.length) throw new Error("Don't use negative numbers: " + negatives );
		return acc + cur;
	})
}

module.exports = add;
