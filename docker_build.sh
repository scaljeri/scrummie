#!/bin/sh
# Start Scrummie in Docker instance.
# Runs Mongo in a seperate instance.

echo "Building Docker container ...."
docker build -t scrummie/scrummie .

DOCKER_LAST_IMG_ID=`docker images | head -2 | tail -1 | awk '{print $3}'`
echo "Docker container image id: $DOCKER_LAST_IMG_ID"
echo $DOCKER_LAST_IMG_ID > .docker_img_id

echo "Scrummie Docker container build."
