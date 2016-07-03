function repeat(operation, num) {
    if (num <= 0) return
    operation()
	// 10 is arbitrary.
	 if (num % 7 === 0) {
	   setTimeout(function() {
		 repeat(operation, --num)
	   })
	 } else {
	   repeat(operation, --num)
	 }
}

module.exports = repeat
