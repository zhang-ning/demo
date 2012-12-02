// module("Qunit API");
// 	test( "OK", 3,function() {
// 		ok(  1 , '1');
// 		ok( "1" , '"1"');
// 		ok( true , 'true');
// 	});

// 	test( "equal", 3,function() {
//     equal( 0, 0, "0 === 0" );
//     equal( 'hi', 'hi', "hi === hi" );
//     equal( true, true, "true === true" );
// 	});

// 	test( "deepEqual", 1,function() {
//     deepEqual( {a:1}, {a:1}, "{a:1} equal {a:1}" );
// 	});

// 	test( "notDeepEqual", 1,function() {
//     var obj = { foo: "bar" };
//     notDeepEqual( obj, { foo: "bla" }, '{foo:"bar"} not equal {foo:"bla"}' );
// 	});

module("Dmoe One");
	test( "add", 2,function(){
		equal(11, demo.one.add(1,10), "11 === 1 add 10");
		deepEqual( demo.one.add({a:1},{b:2}), {a:1,b:2}, "{a:1} add {b:2} equal {a:1,b:2}");
	});
module("Demo two");
	test( "add", 3,function(){
		equal(true, demo.two.isArray([1,2]), "[1,2] is array");
		equal(false, demo.two.isArray({id:1}), "{id:1} is not array");
		equal(false, demo.two.isArray('1,2'), "'1,2' is not array");
	});
module("Demo three");
	test('getName', 1, function() {
		var jack = new demo.three.person('jack');
	  equal('jack', jack.getName(), "getName worked fine.");
	});
	test('setName', 1, function() {
	  var jack = new demo.three.person('jack');
	  equal('tom', jack.setName('tom').getName(), "setName worked fine.");
	});