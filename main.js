var express = require('express'),
	server = express(),
	related = require('./modules/related.js'),
	search = require('./modules/search.js');

server.set('port', (process.env.PORT || 5000));
server.use(express.static(__dirname + '/app'));
// server.get('/',function(req,res){res.sendFile('../' + __dirname + '/client/index.html');});
server.get('/related',related.request.handler);
server.get('/search',search.request.handler);

server.listen(server.get('port'), function(){
	console.log('FOTYN listening on port ' + server.get('port'));
});