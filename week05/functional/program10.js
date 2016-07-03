module.exports = function(namespace) {
	return console.log.bind(console.log, namespace)
}
