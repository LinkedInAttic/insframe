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
(function(context, Class, pool) {
  /**
   * TestRunner - test cases runner
   * @author Tan Nhu, tnhu AT linkedin DOT com
   */
  Class({
    $singleton: true,
  
    /**
     * Add a test case into test pool
     */
    add: function(name, clazz) {
      pool.push({ name: name, clazz: clazz });
    },
  
    /**
     * Run test cases
     */
    run: function() {
    },
    
    /**
     * main entry point
     */
    main: function(TestRunner) {
      if (context.jsface) {
        context.TestRunner = TestRunner;
      } else {
        module.exports = TestRunner;
      }
    }
  });
})(this, this.jsface && this.jsface.Class || require("jsface").Class, []);