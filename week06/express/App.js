const http = require('http');
const open = require('open');

module.exports = class App {
	constructor(){
		this.middlewares = [];
	}
	use(){
		Array.from(arguments).map( mw => this.middlewares.push(mw));
	}
	start(port, host, callback){
		http.createServer( (req, res) => {
			this.middlewares.forEach( mw => mw(req, res))
		}).listen(port, host, () => {
			console.log('Launching your IE7');
		    open(`http://${host}:${port}`);
		})
		if(typeof callback == 'function') callback();
	}
}
