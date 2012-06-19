require(['greeter', 'jquery'], function(greeter, $) {
	$(function() {
		$('#greetings').replaceWith(greeter.greet('Harald'));
	});
});
