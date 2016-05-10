var express  = require('express');
var morgan = require('morgan');
var fs = require('fs');
var favicon = require('serve-favicon');
var port = process.env.PORT || 3000
var app = express();
app.use(favicon(__dirname + '/android-icon-192x192.png'));

app.use(morgan('short'));

app.get('/', function(req,res){
	fs.createReadStream(__dirname + '/index.html').pipe(res);
	// res.send('Welcome to the FCC Micro Service, where everybody knows what time you\'re on!')
})


app.get('/:time', function(req,res){
	var date = req.params.time;
		var time = {
		human: "",
		nerdEpoch: ""
		//new Date(date).getTime() / 1000
	}
	if(Number(date)){
		console.log('inside if')
		var epoch = new Date(date *1000);
		var monthname=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		var formattedDate = monthname[epoch.getMonth()] + ' ' 
                    + epoch.getDate() + ', ' + epoch.getFullYear();
        time = {
        	human: formattedDate,
        	nerdEpoch: date
       	}
       	res.json(time);
	}
	else{
		console.log('inside else')
		time = {
			human: date,
        	nerdEpoch: new Date(date).getTime() / 1000
		}
		res.json(time);
	}
	
})


app.listen(port, function(){
	console.log('runnin on PORT')
});