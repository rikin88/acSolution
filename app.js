var express = require('express');
var esClient = require('./connection.js');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

var myRouter = express.Router();

myRouter.route('/Search')
	.get(function(req,res) {

		var query = {};
		if(req.query.product) {
			query.product = req.query.product;
		}

		var result = "";

		esClient.search({  
  			index: 'productlist',
  			type: 'product',
				body: {
					query: {
			      match: {"name" : query.product}
			    },
				}
			} , function (error, response, status) {
			    if (error){
			      console.log("search error: "+error)
			    }
			    else {
				    response.hits.hits.forEach(function(hit){
				      result = result + '{ "id":' + '"' + hit._id  + '"' + ', "name":' +  '"' + hit._source.name + '"' + '},';
				    });
				    result= result.substring(0, result.length - 1); 
				    var resultString = '{ "products" : [' + result + ' ]}';
				    //var resultString = '[' + result + ']';
						//var resultString= '{ ' + result + ' }';
						//var resultString = result;
				    console.log("Result String is : " + resultString);
				    res.json(resultString);
			    }
			});
	});

app.use('/api', myRouter);


app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(port, function() {
	console.log('Gulp is running on port ' + port) ;
})


