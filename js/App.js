/**
 * InsFrame main application class
 * Copyright (c) 2012 LinkedIn Corporation
 * @author Tan Nhu
 */
Class({
  $statics: {
    SOCKET_IO_CONF: {
      "max reconnection attempts": Infinity,
      "reconnection delay"       : 500,
      "connect timeout"          : 2000,
      "reconnection limit"       : 15000
    },
    IFRAME_WIDTH : "100%",
    IFRAME_HEIGHT: "500px",
    template     : "<div class='iframe-container' id='{id}'><iframe id='frame-{id}' src='{url}' width='{width}' height='{height}' border='0'></iframe>";
  },

  /**
   * Constructor
   * @param config application config
   */
  constructor: function(config) {
    var socket    = io.connect(config.HOST + ":" + config.PORT, this.SOCKET_IO_CONF),
        container = $("#console"),
        th        = this;

    // fill in template width and height
    this.template = this.template.replace("{width}", this.IFRAME_WIDTH).replace("{height}", this.IFRAME_HEIGHT);

    // when receiving open command:
    //   1. remove previous iframe which has the same url if there's any
    //   2. create a new iframe an append to document
    //   3. listen the iframe's load event, when it's ready, send back msg 'iframe-loaded' to InsFrame
    socket.on("open", function(data) {
      var markup;

      if (data) {
        $("#" + data.id).remove();
        markup = th.buildMarkup(data.id, data.url);
        $(markup).appendTo(container);
        $("#frame-" + data.id).load(function() {
          socket.emit("iframe-loaded", data);
        });
      }
    });

    // when receiving close comand
    //   - remove iframe from document
    socket.on("close", function(data) {
      if (data && document.getElementById(data.id)) {
        $("#" + data.id).remove();
      }
    });

    // when receiving clear command
    //   - reset container, wipe out all iframes
    socket.on("clear", function(data) {
      container.html("");
    });

    // prevent redirect
    this.preventRedirect();
  },

  /**
   * Build an iframe markup
   * @param id iframe id
   * @param url iframe url
   * @return ifram markup
   */
  buildMarkup: function(id, url) {
    return this.template.replace(/{id}/g, id).replace(/{url}/g, url);
  },

  /**
   * Prevent any attempts to redirect main document to another. Always keep InsFrame's url.
   */
  preventRedirect: function() {
    var preventBust = 0;
    window.onbeforeunload = function() {
      preventBust++;
    };

    setInterval(function() {
      if (preventBust > 0) {
        preventBust -= 2;
        window.top.location = config.HOST + ":" + config.PORT;
      }
    }, 1);
  },

  /**
   * Main entry point.
   * @param App application class
   */
  main: function(App) {
    $.fn.ready(new App(config));
  }
});
