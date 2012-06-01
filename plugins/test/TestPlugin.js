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
var Class = require("jsface").Class;

/**
 * InsFrame Unit Testing Plugin
 * @author Tan Nhu, tnhu AT linkedin DOT com
 */
Class({
  /**
   * Constructor
   * @param args plugin arguments (passed from command line)
   */
  constructor: function(args) {
    console.log(process.cwd(), "HERE AND THERE", args);
  },
  
  /**
   * Main entry point
   * @param Plugin plugin class
   */
  main: function(Plugin) {
    module.exports = Plugin;
  }
});