const App = require('./App');
const config = require('config');

const server = new App();

const port = config.get('App.port');
const host = config.has('App.host') ? config.get('App.host') : 'localhost';

const mw1 = (req, res) => {
    console.log('Destroy system');
};

const mw2 = (req, res) => {
    console.log('System is corrupt');
	res.end("Who is John Gault?");
};

server.use(mw1, mw2);
server.start(port, host, ()=>console.log(`Listening at localhost:${port}`) )
