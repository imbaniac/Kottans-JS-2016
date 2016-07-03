"use strict";

const add = str => {
	if(str == "") return 0;
	let pattern;
	let negatives = [];
	let array = str.match(/^\/\/(.+)\n/);
	if (array){
		let [{length}, delimArray] = array;
		delimArray = delimArray.split(/[\[\]]/).filter(el => el);
		let escapedDelimArray = delimArray.map(delim => {
			let ed = delim.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		 	return ed;
		})
		str = str.slice(length);
		pattern = RegExp(escapedDelimArray, "g");
	}
	else pattern = /[,\n]/g

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

add("//[*][%]\n1*2%3");
// add("//[***]\n1***2***3")
module.exports = add;
