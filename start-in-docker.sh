#!/bin/sh
# Start Scrummie in Docker instance.
# Runs Mongo in a seperate instance.

echo Building Docker container ....
docker build .

DOCKER_LAST_IMG_ID=`docker images | head -2 | tail -1 | awk '{print $3}'`
echo Docker container image id: $DOCKER_LAST_IMG_ID
cat $DOCKER_LAST_IMG_ID > .docker_img_id

echo Starting Docker container ...
docker run -d --name="scrummie" --link mongo:mongodb -p 3000:3000 $DOCKER_LAST_IMG_ID /opt/scrummie/start-scrummie.sh
echo Docker container started.

echo Done.
