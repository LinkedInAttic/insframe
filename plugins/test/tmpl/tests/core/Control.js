TestCase("Control.js Unit Test", {
  before: function() {
  },
  
  after: function() {
  },
  
  setUp: function() {
  },
  
  tearDown: function() { 
  },
  
  test1: function() {
    async(function() {
      setTimeout(function(){
        ok(true, "always fine");
      }, 13);
    });
    
    ok(true, "this is fine!");
  },
  
  test2: function() {
  }
});