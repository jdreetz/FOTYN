describe('Utilities Test', function(){
	var Utilities;

	beforeEach(module('FOTYN'));
	beforeEach(inject(function(_Utilities_){
		Utilities = _Utilities_;
	}));

	it('Utilities.indexOfObject should find the correct indicies', function(){
		var arr = [
			{ name:'Foo' },
			{ name:'Bar' },
			{ name:'Biz' },
		];
		expect(Utilities.indexOfObject(arr,'name','Biz')).toEqual(2);
		expect(Utilities.indexOfObject([],'','')).toEqual(-1);
	});
});