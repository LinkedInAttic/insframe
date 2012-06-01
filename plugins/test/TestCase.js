/*
 * Copyright (C) 2012 LinkedIn Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function(context, Class) {
  var ALL      = "all",
      BROWSERS = "browsers",
      NODEJS   = "nodejs",
      RHINO    = "rhino";
      
  /**
   * TestCase - base class for test cases
   * @author Tan Nhu, tnhu AT linkedin DOT com
   */
  var TestCase = Class({
    /** test modes */
    $statics: {
      TEST_ALL     : ALL,                        // test under everything if possible
      TEST_BROWSERS: BROWSERS,                   // test under browsers connected to InsFrame
      TEST_NODEJS  : NODEJS,                     // test under NodeJS environment
      TEST_RHINO   : RHINO                       // test under Mozilla Rhino environment
    },

    /** 
     * default mode is "browsers", change this value in your test case to speficy test case environment
     * Note: mode accepts array, for example mode: [ NODEJS, RHINO ]
     */
    mode: BROWSERS,
  
    /**
     * constructor
     * @param name test case name
     * @param api test cases
     */
    constructor: function(name, api) {
      TestRunner.addTestCase(name, Class(TestCase, api));
    },

    /**
     * before is executed before any test cases get executed
     */
    before: function() {},

    /**
     * setUp is executed before each test case
     */
    setUp: function() {},

    /**
     * tearDown is executed after each test case
     */
    tearDown: function() {},

    /**
     * after is executed when all test cases are executed completely
     */
    after: function() {},

    /**
     * main entry point
     */
    main: function(TestCase) {
      if (context.jsface) {
        context.TestCase = TestCase;
      } else {
        module.exports = TestCase;
      }        
    }
  });
})(this, this.jsface && this.jsface.Class || require("jsface").Class);