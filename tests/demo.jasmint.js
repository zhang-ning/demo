(function(){
	// describe("Jasmine API", function() {

	// 	var foo;

	//   beforeEach(function() {
	//     foo = 0;
	//     foo += 1;
	//   });

	//   afterEach(function() {
	//     foo = 0;
	//   });

	//   it("toBe", function() {
	//     expect(true).not.toBe(false);
	//     expect(1).toBe(1);
	//   });

	//   it("toEqual", function() {
	//     expect({a:1}).toEqual({a:1});
	//   });

	//   it('toBeTruthy', function() {
	//   	expect(true).toBeTruthy();
	//   })

	//   it('toBeFalsy', function() {
	//   	expect(false).toBeFalsy();
	//   });
	//   it("toMatch", function() {
	//     var message = 'foo bar baz';

	//     expect(message).toMatch(/bar/);
	//     expect(message).toMatch('bar');
	//     expect(message).not.toMatch(/quux/);
 //  	});

	//   it("toBeDefined", function() {
	//     var a = {
	//       foo: 'foo'
	//     };

	//     expect(a.foo).toBeDefined();
	//     expect(a.bar).not.toBeDefined();
	//   });

	//   it("toBeUndefined", function() {
	//     var a = {
	//       foo: 'foo'
	//     };

	//     expect(a.foo).not.toBeUndefined();
	//     expect(a.bar).toBeUndefined();
	//   });

	//   it("toBeNull", function() {
	//     var a = null;
	//     var foo = 'foo';

	//     expect(null).toBeNull();
	//     expect(a).toBeNull();
	//     expect(foo).not.toBeNull();
	//   });

	//   it("toBeTruthy", function() {
	//     var a, foo = 'foo';

	//     expect(foo).toBeTruthy();
	//     expect(a).not.toBeTruthy();
	//   });

	//   it("toBeFalsy", function() {
	//     var a, foo = 'foo';

	//     expect(a).toBeFalsy();
	//     expect(foo).not.toBeFalsy();
	//   });

	//   it("toContain", function() {
	//     var a = ['foo', 'bar', 'baz'];

	//     expect(a).toContain('bar');
	//     expect(a).not.toContain('quux');
	//   });

	//   it("toBeLessThan", function() {
	//     var pi = 3.1415926, e = 2.78;

	//     expect(e).toBeLessThan(pi);
	//     expect(pi).not.toBeLessThan(e);
	//   });

	//   it("toBeGreaterThan", function() {
	//     var pi = 3.1415926, e = 2.78;

	//     expect(pi).toBeGreaterThan(e);
	//     expect(e).not.toBeGreaterThan(pi);
	//   });

	//   it("toBeCloseTo", function() {
	//     var pi = 3.1415926, e = 2.78;

	//     expect(pi).not.toBeCloseTo(e, 0.1);
	//     expect(pi).toBeCloseTo(e, 0);
	//   });

	//   it("toThrow", function() {
	//     var foo = function() {
	//       return 1 + 2;
	//     };
	//     var bar = function() {
	//       return a + 1;
	//     };

	//     expect(foo).not.toThrow();
	//     expect(bar).toThrow();
	//   });

	// });

	describe("Demo One", function() {
		describe("add",	function(){
			it("1 add 10 === 11 ", function() {
	    	expect(11).toBe(demo.one.add(1,10));
		  });

		  it("{a:1} add {b:2} equal {a:1,b:2} ", function() {
		    expect({a:1,b:2}).toEqual(demo.one.add({a:1},{b:2}));
		  });

		  it("1 add {b:2} should throw exceptions ", function() {
		    expect(function(){
		    	demo.one.add(1,{b:2});
		    }).toThrow();
		  });
		})
	});

	describe('Demo Two', function() {
		describe('isArray',function() {
			it('[1,2] should be true',function() {
				expect(demo.two.isArray([1,2])).toBeTruthy();
			});

			it('{id:1} should be false',function() {
				expect(demo.two.isArray({id:1})).toBeFalsy();
			});
		});
	});
	describe('Demo Three', function() {
		var jack=new demo.three.person('jack');
		describe('getName', function() {
			it('jack getName should be jack', function() {
				expect('jack').toBe(jack.getName());
			});
		});
		describe('setName', function() {
			it('jack setName tom should be tom', function() {
				expect('tom').toBe(jack.setName('tom').getName());
			});
		})
	});
})(demo)