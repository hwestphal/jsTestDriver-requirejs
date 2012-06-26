jsTestDriver-requirejs-demo
===========================

This sample project shows how to unit test [RequireJS](http://requirejs.org/) modules using [JsTestDriver](http://code.google.com/p/js-test-driver/) and its [AsyncTestCase](http://code.google.com/p/js-test-driver/wiki/AsyncTestCase) feature.

The interesting part is [RequireTestCase](/hwestphal/jsTestDriver-requirejs-demo/blob/master/requireTestCase.js), which is a replacement for JsTestDriver's [TestCase](http://code.google.com/p/js-test-driver/wiki/TestCase).
It adds the the possibility to import modules before executing the test methods. See [here](/hwestphal/jsTestDriver-requirejs-demo/blob/master/project/test/greeterTest.js) for a usage example.
