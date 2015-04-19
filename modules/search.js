// Youtube Search Module

var youtube_config = require('../config/youtube.json'),
	youtube_api = require('youtube-api'),
	NUM_RESULTS = 1;

module.exports = {
  request:{
 	handler:function(req,res){
 		youtube_api.authenticate({
 			type: 'key',
 			key: youtube_config.access_key
 		});

 		youtube_api.search.list(
 			{
 				q: req.query.q,
 				part: 'snippet',
 				maxResults: NUM_RESULTS,
 				order: 'relevance',
 				type:'video'
 			},
 			function(err,data){
 				if(err){
 					res.status(400);
 					res.send(err);
 				}
 				else{
 					res.send(data.items);
 				}
 			}
 		);
 	} 	
  }
}