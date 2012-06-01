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
 * InsFrame Server
 * @author Tan Nhu, tnhu AT linkedin DOT com
 */
Class(function() {
  "use strict";

  var PORT           = 2011,
      TIMEOUT        = 5*60*1000,
      WAIT_TIMEOUT   = 250,
      CHECK_INTERVAL = 2000,
      express        = require("express"),
      crypto         = require("crypto"),
      hostname       = require("os").hostname(),
      colors         = require("colors"),
      path           = require("path"),
      app            = express.createServer(),
      io             = require("socket.io"),
      urlData        = {},
      connections    = 0,
      clear          = false,
      homeFolder, port;

  return {
    /**
     * Constructor
     * @param port port
     */
    constructor: function(port) {
      this.port = port;
      this.initEnvironment();
      this.initRouting();
      this.initSocketIO();
      this.start();
    },

    /**
     * Setting up environment
     */
    initEnvironment: function() {
      // locale InsFrame root folder
      homeFolder = __dirname;
      console.log("   info  -".cyan, "InsFrame root".yellow, homeFolder);

      // express config
      app.set("view engine", "ejs");
      app.set("views", homeFolder + "/views");
      app.set("views");
      app.set("view options", { layout: null });

      // static resources
      app.use("/js", express.static(homeFolder + "/js"));
      app.use("/css", express.static(homeFolder + "/css"));
      app.use("/images", express.static(homeFolder + "/images"));

      // port
      port = this.port || parseInt(process.argv[2]) || PORT;

      // Timer to send close requests when timeout occurs.
      setInterval(function() {
        for (var id in urlData) {
          urlData[id].timeout -= CHECK_INTERVAL;
          if (urlData[id].timeout <= 0) {
            io.sockets.emit("close", { id: id, url: urlData[id].url });
            console.log("   info  -".cyan, "close/timeout".yellow, JSON.stringify(urlData[id]));
            delete urlData[id];
          }
        }
      }, CHECK_INTERVAL);
    },

    /**
     * Send response only when iframe is loaded on all browsers (see "iframe-loaded" event on io section)
     */
    waitForLoaded: function(id, url, entry, response) {
      return function wait() {
        try {
          (urlData[id].counter > 0) ? setTimeout(wait, WAIT_TIMEOUT) : response.json(entry);
        } catch (error) {
          console.log("   error -".red, "Error openning".yellow, url, error);
        }
      };
    },

    /**
     * Init service routing
     */
    initRouting: function() {
      var waitForLoaded = this.waitForLoaded;

      /** Index page. */
      app.get("/", function(request, response) {
        response.render("index", { hostname: hostname, port: port });
      });

      /** Send an open request, url is provided via query parameter url. */
      app.get("/open/*", function(request, response) {
        var url     = request.query.url,
            timeout = parseInt(request.query.timeout, 10) || TIMEOUT,
            id, entry, waitCallback;

        if (url) {
          if ( !connections) {
            console.log("   error -".red, "No browsers connected to open".yellow, url);
            return response.json({ success: false, error: "No browsers connected to open " + url });
          }

          // broadcast clear request for the first time
          if ( !clear && !Object.keys(urlData).length) {
            io.sockets.emit("clear");
            clear = true;
          }

          id    = crypto.createHash("md5").update(url).digest("hex");
          entry = { type: "open", success: true, id: id, url: url, timeout: timeout };
          io.sockets.emit("open", entry);
          urlData[id]  = { id: id, timeout: timeout, url: url, counter: connections };

          setTimeout(waitForLoaded(id, url, entry, response), WAIT_TIMEOUT);
          console.log("   info  -".cyan, "open".yellow, JSON.stringify(entry));
        } else {
          response.json({ success: false, error: "Invalid url" });
        }
      });

      /** Send a close request, url is provided via query parameter url. */
      app.get("/close/*", function(request, response) {
        var url = request.query.url, id, entry;

        if (url) {
          id    = crypto.createHash("md5").update(url).digest("hex");
          if (urlData[id]) {
            entry = { type: "close", id: id, url: url };
            io.sockets.emit("close", entry);
            console.log("   info  -".cyan, "close".yellow, JSON.stringify(entry));
            delete urlData[id];
          }
        } else {
          entry = {};
        }
        response.json(entry);
      });

      /** Send clear request to all browsers - close all open urls. */
      app.get("/clear/*", function(request, response) {
        io.sockets.emit("clear");
        console.log("   info  -".cyan, "clear".yellow);
        response.json({ success: true });
      });

      /** Return number of connections connecting to InsFrame */
      app.get("/connections", function(request, response) {
        response.json({ connections: connections });
      });
    },

    /**
     * Socket io initialization
     */
    initSocketIO: function() {
      io = io.listen(app);
      io.set("log level", 1);
      io.sockets.on("connection", function(socket) {
        connections += 1;
        console.log("   info  -".cyan, ("new connection. Connections: " + connections).yellow);

        socket.on("disconnect", function() {
          connections -= 1;
          console.log("   info  -".cyan, ("connection closed. Connections: " + connections).yellow);
        });

        socket.on("iframe-loaded", function(data) {
          urlData[data.id].counter--;
          console.log("   info  -".cyan, ("client sends event iframe-loaded").yellow, JSON.stringify(data));
        });
      });
    },

    /**
     * Start server
     */
    start: function() {
      app.listen(port);
      console.log("InsFrame started on".yellow, (hostname + ":" + port).cyan);
    },

    /**
     * Main entry point
     */
    main: function(InsFrame) {
      module.exports = InsFrame;
    }
  };
});
