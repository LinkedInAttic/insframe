Class({
  $singleton: true,
  
  // TODO QUnit API or JUnit API? Prefer QUnit
  
  isTrue: function(obj, message) {},
  isFalse: function(obj, message) {},
  isNumber: function(obj, message) {},
  isString: function(obj, message) {},
  isDate: function(obj, message) {},
  isNullOrUndefined: function(obj, message) {},
  isEmpty: function(obj, message) {},
  isObject: function(obj, message) {},
  isClass: function(obj, message) {},
  isFunction: function(obj, message) {},
  isArray: function(obj, message) {},
  
  raises: function(func, message) {},
  
  fail: function(message) {},
  
  equals: function() {},
  notEquals: function() {},
  deepEquals: function() {},
  
  main: function(Asserts) {
    
  }
});