function duckCount() {
	return Array.from(arguments).filter(arg=> Object.hasOwnProperty.call(arg, "quack")).length;
}

module.exports = duckCount
