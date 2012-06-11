(function(context, jsface) {
  var Class = jsface.Class;
  
  /**
   * TestUtil defines static shared testing APIs.
   * @author Tan Nhu, tnhu AT linkedin DOT com
   */
  Class({
    $singleton: true,
  
    isTrue: function(obj, message) {
      
    },
    
    isFalse: function(obj, message) {
      
    },
    
    isNumber: function(obj, message) {
      
    },
    
    isString: function(obj, message) {
      
    },
    
    isDate: function(obj, message) {
      
    },
    
    isNullOrUndefined: function(obj, message) {
      
    },
    
    isEmpty: function(obj, message) {
      
    },
    
    isClass: function(obj, message) {
      
    },
    
    isFunction: function(obj, message) {
      
    },
    
    isArray: function(obj, message) {
      
    },
      
    isObject: function(obj, message) {
      
    },
  
    isCalled: function(ctx, fnName, executor, message) {
      
    },
    
    ok: function(state, message) { // !isNullOrUndefined
      
    }, 
    
    equal: function(actual, expected, message) {
      
    },
    
    notEqual: function(actual, expected, message) {
      
    },
    
    raises: function(fn, expected, message) {
      
    },
    
    fail: function(message) {
      
    },
    
    /**
     * Create an asynchronous test
     */
    async: function(fn) {
      // todo add an after pointcut to fn
    },
    
  
    /**
     * Main entry point
     */
    main: function(TestUtil) {
      var global = context.jsface ? context : GLOBAL;
      
      // bind TestUtil to context or export it
      if (context.jsface) {  
        context.TestUtil = TestUtil;
      } else {
        module.exports = TestUtil;
      }
      
      // bind TestUtil APIs into global context (currently support browsers and NodeJS - via GLOBAL)
      for (var key in TestUtil) {
        if (TestUtil.hasOwnProperty(key)) {
          global[key] = TestUtil[key];
        }
      }
    }
  });
})(this, this.jsface || require("jsface"));