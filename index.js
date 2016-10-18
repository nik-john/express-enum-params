const express = require('express');
const app = express();
app.get('/', function(req, res, next) {
	res.send('Hello world!');
});
app.get('/:locale(us|uk)', function(req, res, next) {
	res.send('Hello ' + req.params.locale);
});
app.listen(3001, function() {
	console.log('App is listening on port 30001');
});