(function(){
	angular
		.module('FOTYN')
		.controller('MainController', ['$scope','YoutubeRequest', function($scope,youtube_request){
			var YOUTUBE_IMAGE_URL = 'http://img.youtube.com/vi/{{YT_ID}}/hqdefault.jpg';

			$scope.video = {
				id:'J18UuMOybik',
				title: 'D2: Getting the Crew Back Together',
				related_videos:[],
				player_vars:{
					controls:2,
					showinfo:0,
					modestbranding:1,
					autoplay:true
				},
				update:function(id,title){					
					$scope.history.update($scope.video.id,$scope.video.title);
					$scope.video.id = id;
					$scope.video.title = title;
					$scope.video.update_related(id);
				},			
				update_related: function(id){
					youtube_request.get_related(id).then(function(related){
						$scope.video.related_videos = related;
					});
				}
			};

			$scope.input_update = function(key_event){
				if(key_event.keyCode === 13){
					youtube_request.search($scope.search_terms).then(function(results){
						$scope.video.update(results[0].id.videoId,results[0].snippet.title);
					});
				}
			};
			$scope.search_terms = '';

			// This could probably be pushed into it's own Directive or Service
			$scope.history = [];
			$scope.history.choose = function(index){
				$scope.video.update(this[index].id,this[index].title);
				this.splice(index,this.length);
			};
			$scope.history.update = function(id,title){
				this.push({
					id: id,
					title: title,
					img: YOUTUBE_IMAGE_URL.replace('{{YT_ID}}', id)
				});
			};

			// Update related for default video
			$scope.video.update_related($scope.video.id);
		}])	
})();
