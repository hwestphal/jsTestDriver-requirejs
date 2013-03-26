/*
 * Copyright (c) 2012, Harald Westphal
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * * Neither the name of the copyright holder nor the
 * names of his contributors may be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 */
var RequireTestCase, ConditionalRequireTestCase;

(function() {
	var buildTestCase = function(testCase, moduleNames, proto) {
		for (var key in proto) {
			if (proto.hasOwnProperty(key)) {
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
								that.callLater = function(func) {
									queue.call(func);
									return that;
								};
								f.apply(that, modules);
							});
						}
					})(proto[key]);
				} else {
					testCase.prototype[key] = proto[key];
				}
			}
		}
		return testCase;
	};

	RequireTestCase = function(name, moduleNames, proto) {
		return buildTestCase(AsyncTestCase(name), moduleNames, proto);
	};

	ConditionalRequireTestCase = function(name, condition, moduleNames, proto) {
		return buildTestCase(ConditionalAsyncTestCase(name, condition), moduleNames, proto);
	};
})();
