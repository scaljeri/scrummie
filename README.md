scrum-board
===========

An analogue digital scrumboard. You can find a demo [here](http://scrummie.meteor.com)

## Run in development

    $> MONGO_URL='mongodb://localhost:27017/scrumboard' meteor
    $> MONGO_URL='mongodb://localhost:27017/scrumboard' mrt

## Bundle

    $> cd .gulp
    $.gulp> gulp styles
    $> cd ..
    $> meteor bundle scrummie.tgz

    # unpack on destination
    $> cd bundle

    # rebuild native packages
    $> rm -rf programs/server/node_modules/fibers
    $> npm install fibers@1.0.1

    # setup environment variables
    $> export MONGO_URL='mongodb://localhost'
    $> export ROOT_URL='http://example.com'
    $> export PORT=3000
    $> node main.js

    # if wrong version of node
    $> sudo npm install n -g
    $> sudo n 0.10.26   // This will give you the specific version

## URL parameters

### Task colors

Create post-its with default colors (only if no colors are defined)
Examples:

    http://scrummie.meteor.com?colors=ffff92
    http://scrummie.meteor.com?colors=ffff92,232345
    http://scrummie.meteor.com?colors=Backend,Front

### Initials

Automatically add initials when moving a post-it from one lane to the other (only if no initials are set yet)
Examples:

    http://scrummie.meteor.com?member=Lucas
    http://scrummie.meteor.com?member=LC


Resources:

  * http://stackoverflow.com/questions/21324716/db-not-defined-error-in-mongodb-using-meteor-js/21325934#21325934


Interesting:

  * http://www.manuel-schoebel.com/blog/iron-router-tutorial
  * http://stackoverflow.com/questions/18520550/meteor-pass-data-to-nested-templates
  * https://www.andrewmunsell.com/blog/introduction-to-realtime-web-meteor-and-nodejs
  * https://github.com/aknuds1/example-meteor-and-ng-app
  * http://projectricochet.com/blog/meteor-js-performance#.UzCGAK1dXno
  * https://www.eventedmind.com/feed/meteor-ironrouter
  * https://www.eventedmind.com/feed/meteor-introducing-deps
  * https://www.eventedmind.com/feed/
  * Fast renderer
    * http://meteorhacks.com/introducing-fast-render.html
    * http://meteorhacks.com/fast-render-internals-and-how-it-works.html
  * http://github.differential.io/reststop2/
  * https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md
