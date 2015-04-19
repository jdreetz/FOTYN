describe('MainController Tests', function(){

	//  Respond to dynamic endpoint requests
	var RELATED_ENDPOINT = function(req){
			return req.indexOf('/related/?v=') > -1;
		},
		SEARCH_ENDPOINT  = function(req){
			return req.indexOf('/search/?q=') > -1;
		};

	var scope,
		$httpBackend,
		relatedHandler,
		searchHandler;

	// Create base Angular module
	beforeEach(module('FOTYN'));

	// Init test resources
	beforeEach(inject(function($rootScope,$controller,$injector){
		scope = $rootScope.$new();
		
		// Mock endpoint responses
		$httpBackend 	= $injector.get('$httpBackend');
		searchHandler	= $httpBackend
							.when('GET',SEARCH_ENDPOINT)
							.respond(MOCKS.search);
		relatedHandler 	= $httpBackend
							.when('GET',RELATED_ENDPOINT)
							.respond(MOCKS.related);

		$controller('MainController',{ $scope:scope });
		$httpBackend.flush(); // Flush initial related videos request		
	}));

	// Make sure all connections are closed
	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('Should create empty history and find related videos to default video', function(){
		expect(scope.history.length).toEqual(0);
		expect(scope.video.related_videos.length).toEqual(2);
	});

	it('Should update scope to new video and store previous in history', function(){
		var previous_id = 'abcde',
			current_id = 'fghij';
		scope.video.id = previous_id;
		scope.video.update(current_id);

		expect(scope.history.length).toEqual(1);
		expect(scope.history[0].id).toEqual(previous_id);
		expect(scope.video.id).toEqual(current_id);

		$httpBackend.flush(); // Flush updated related
	});

	it('Should search for a video and load it and related videos', function(){
		scope.search_terms = 'James';
		scope.input_update({keyCode:13});
		$httpBackend.flush(); // Flush search request
		
		expect(scope.video.id).toEqual('UzUFrUEhEdU');
		expect(scope.video.related_videos.length).toEqual(2);
	});

	it('Should clear the history up to the selected video', function(){
		scope.history.push.apply(scope.history, MOCKS.history);
		expect(scope.history.length).toEqual(3);
		scope.history.choose(1);
		expect(scope.history.length).toEqual(1);

		$httpBackend.flush();
	});
});