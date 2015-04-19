(function(){
	angular
		.module('FOTYN')
		.factory('YoutubeRequest',['$http', '$q', function($http,$q){
			var RELATED_ENDPOINT = '/related/',
				SEARCH_ENDPOINT = '/search/';

			return {
				search: function(search_terms){
					return query_endpoint(SEARCH_ENDPOINT,{q:search_terms});
				},
				get_related: function(video_id){
					return query_endpoint(RELATED_ENDPOINT,{v:video_id});
				}
			}

			function query_endpoint(endpoint,params){
				var deffered = $q.defer();

				$http
					.get(endpoint, { params:params } )
					.success(function(data){
						deffered.resolve(data);
					})
					.error(function(data){
						deffered.reject(data);
					});

				return deffered.promise;
			}
		}]);
})();