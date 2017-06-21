var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client ( {
	hosts: [
		'http://104.155.142.65:9200'
	]
});

module.exports = client;