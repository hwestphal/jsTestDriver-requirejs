/*
AsyncTestCase('greeterTest', {
	testGreet: function(queue) {
		var greeterModule;
		queue.call(function(callbacks) {
			require(['greeter'], callbacks.add(function(greeter) {
				greeterModule = greeter;
			}));
		});
		queue.call(function() {		
			assertEquals('Hello World', greeterModule.greet('World'));
		});
	}
});
*/

RequireTestCase('greeterTest2', ['greeter'], {
	adder: function(a, b) {
		return a+b;
	},
	CONST_A: 1,
	CONST_B: 2,
	setUp: function(greeter) {
		this.blub = greeter.greet('Harald');
	},
	testGreet: function(greeter) {
		assertEquals('Hello World', greeter.greet('World'));
	},
	testBla: function() {
		assertEquals('Hello Harald', this.blub);
	},
	testMore: function() {
		assertEquals(3, this.adder(this.CONST_A, this.CONST_B));
	}
});
