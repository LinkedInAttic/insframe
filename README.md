InsFrame (Inside iFrame) is a central hub to distribute web apps to multiple environments. You have some browsers connect to InsFrame and then send a url to it, all browsers will open the url.

We first implemented InsFrame to work with [JsTestDriver](http://code.google.com/p/js-test-driver/) to distribute JavaScript unit tests to multiple browsers on multiple environments automatically and transparently in order to reduce the complexity of setting up multiple browsers for each developer but still make sure code quality.

InsFrame is very potential to do some solid work, such as:

* JavaScript unit testing continuous integration
* Distribute performance benchmarks
* Screen scraping

InsFrame is built on top of [NodeJS](nodejs.org), [Express](http://expressjs.com/), [SocketIO](http://socket.io/), and [JSFace](https://github.com/tnhu/jsface).

## Installation

    $ npm install -g insframe

## Quick Start

Start InsFrame server:

    $ insframe

By default InsFrame listens to port 2011. You can run InsFrame in another port, for example:

    $ insframe 8081

Point some browsers to InsFrame.

## Hack it locally

First clone InsFrame from out Github repository:

    $ git clone git://github.com/linkedin/insframe.git

Then run:

    $ cd insframe && node -e "new (require('./InsFrame'))()"

## Commands

### open: Distribute a URL

To distribute a url, send a request to /open/?url=URL. For example:

    $ curl http://localhost:2011/open/?url=http://engineering.linkedin.com

### close: Close a URL

To close an url, send a request to /close/?url=URL. For example:

    $ curl http://localhost:2011/close/?url=http://engineering.linkedin.com

### clear: Close all URLs

To close all URLs have been distributed by InsFrame, send a request to /clear. For example:

    $ curl http://localhost:2011/clear/

Clear command is run after 5 minutes timeout to make sure all browsers connecting to InsFrame have a fresh state.
