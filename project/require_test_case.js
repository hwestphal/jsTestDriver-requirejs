function RequireTestCase(name, moduleNames, def) {
	var testCase = AsyncTestCase(name);
	for (var key in def) {
		if (def.hasOwnProperty(key)) {
			if (key === 'setUp' || key === 'tearDown' || key.substring(0, 4) === 'test') {
				testCase.prototype[key] = (function(f) {
					return function(queue) {
						var that = this;
						var modules;
						queue.call(function(callbacks) {
							require(moduleNames, callbacks.add(function() {
								modules = arguments;
							}));
						});
						queue.call(function() {
							f.apply(that, modules);
						});
					}
				})(def[key]);
			} else {
				testCase.prototype[key] = def[key];
			}
		}
	}
}
