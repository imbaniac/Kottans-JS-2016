function Spy(target, method) {
	let obj = {
		count: 0
	};
	let oldMethod = target[method];
	target[method] = function(){
		obj.count++;
		return oldMethod.apply(this, arguments);
	}
	return obj;
}

module.exports = Spy
