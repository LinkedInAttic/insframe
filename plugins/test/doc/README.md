npm install -G insframe
insframe gen-test tests

cd tests
insframe test

### What's different?

- No setup required in order to write or run tests
- Environments can be customized via conf/settings.json
- Support testing on both client (browser) and server (NodeJS, Mozilla Rhino)
- Reports could be text (console), JSON, or JUnit-liked output
- PhantomJS integration (no browser setup required)
- Static resources support (/js/*, /images/*, /data/*, etc.)
- Echo service (returns everything it receives)

### Async tests

- By default, tests are synchronous
- Asynchronous tests are specified by API

``` javascript
TestCase("Control.js Unit Test", {
  testTimeout: function() {
    async(function() {
      setTimeout(function(){
        ok(true, "always fine");
      }, 13);
    });
    
    ok(true, "this is fine!");
  }
});
```

### Mock objects

- HTML chunks are injected by convention: Control.js (test) => Control.html (HTML chunks)
- JavaScript mock objects: TBD. Needed?

### Function spies

Simple

``` javascript
TestCase("Control.js Unit Test", {
  testIsCalled: function() {
    var spy = TestUtil.spy();          // borrow from SinonJS
     
    Events.bind("foo", spy);
    Events.fire("foo");
    
    isCalled(spy, "Spy function must be called");
  }
});
```

Advanced (AOP)

``` javascript
TestCase("Control.js Unit Test", {
  testIsCalled: function() {
    var spy = TestUtil.spy(LI, "asyncRequest");
    
    isCalled(spy, function() {
      LI.asyncRequest("/");
    }, "aSyncRequest must be called");
  }
});
```


### Asserts

- QUnit-liked API: fail, raises, ok, equal, notEqual, etc.
- isXXX APIs: isTrue, isFalse, isNumber, isString, isFunction, isClass, etc.

### Utils

- Browser events simulation: Recommend to use YUI Events Simulator. Not a core thing
- Echo server

### Server side support

- NodeJS + Mozilla Rhino support is on plan
- Minor additional information may need to add into tests
- No setup required