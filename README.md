scrum-board
===========


An analogue digital scrumboard

    $> MONGO_URL='mongodb://localhost:27017/scrumboard' meteor
    $> MONGO_URL='mongodb://localhost:27017/scrumboard' mrt

Setup

	$> meteor remove autopublish


Bundle
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
