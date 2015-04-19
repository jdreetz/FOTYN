// These tests don't do much other than test 
// Angular's httpBackend service, but in the
// future they may be useful if the request
// logic become more complicated

describe('YoutubeRequest Test', function(){
	var SEARCH_TERM = 'James',
		RELATED_ENDPOINT = function(req){
			return req.indexOf('/related/?v=') > -1;
		},
		SEARCH_ENDPOINT  = function(req){
			return req.indexOf('/search/?q=') > -1;
		};

	var ytrequest, 
		$httpBackend,
		relatedHandler,
		searchHandler;

	beforeEach(module('FOTYN'));
	beforeEach(inject(function($injector){
		ytrequest 		= $injector.get('YoutubeRequest');
		$httpBackend 	= $injector.get('$httpBackend');
		searchHandler	= $httpBackend
							.when('GET',SEARCH_ENDPOINT)
							.respond(MOCKS.search);
		relatedHandler 	= $httpBackend
							.when('GET',RELATED_ENDPOINT)
							.respond(MOCKS.related);

	}));

	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('Should return an array of search results', function(){
		var results;
		// $httpBackend.expectGET(SEARCH_ENDPOINT);
		ytrequest.search(SEARCH_TERM).then(function(data){
			results = data;
		});

		$httpBackend.flush();

		expect(results.length).toEqual(1);
		expect(results[0].id.videoId).toEqual('UzUFrUEhEdU');
	});

	it('Should return an array of related videos', function(){
		var results;

		ytrequest.get_related('abcde').then(function(data){
			results = data;
		});

		$httpBackend.flush();

		expect(results.length).toEqual(2);
	});
});





