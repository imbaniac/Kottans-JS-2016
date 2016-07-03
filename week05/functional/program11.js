module.exports = function arrayMap(arr, fn) {
	return arr.reduce(function(acc, item) {
    	acc.push(fn(item))
		return acc;
  }, [])
}
