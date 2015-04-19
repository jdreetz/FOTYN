// This service was used at one point to search the video history
// but isn't used any longer. I decided to leave it in for future
// utility requirements in the future

angular
	.module('FOTYN')
	.factory('Utilities',function(){
		return {
			indexOfObject:function(arr,prop,val){
				var index = -1;
				for(var i = 0, l = arr.length; i < l; i++){
					if(arr[i][prop] === val){
						index = i;
						break;
					}
				}
				return index;
			}
		};
	});