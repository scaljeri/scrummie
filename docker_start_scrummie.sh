#!/bin/bash

BOOT2DOCKER=`which boot2docker`

# Check Boot2Docker is installed
echo "Check Boot2Docker is installed ..."
if [ "$BOOT2DOCKER" == "" ] 
then
	echo "Boot2Docker not available."
	echo "First install Boot2Docker, then run this script again."
	exit 1
fi
echo "Boot2docker installed."

# Initialize Boot2docker. Does not matter if already initialized.
echo "Initializing boot2docker (just in case)"
$BOOT2DOCKER init >/dev/null

# Add forward of mongo port from boot2docker-vm to localhost
VBoxManage controlvm boot2docker-vm natpf1 "mongodb,tcp,127.0.0.1,27017,,27017" 2>/dev/null
# Add forward of scrummie port from boot2docker-vm to localhost
VBoxManage controlvm boot2docker-vm natpf1 "mongodb,tcp,127.0.0.1,3000,,3000" 2>/dev/null

# Start Boot2docker if not started yet.
BOOT2DOCKER_STATUS=`boot2docker status`
echo "Boot2docker status: $BOOT2DOCKER_STATUS"
if [ "$BOOT2DOCKER_STATUS" != "running" ]
then
	echo "Starting Boot2Docker..."
	$BOOT2DOCKER start
fi

# Set DOCKER_HOST (assume default port)
export DOCKER_HOST=tcp://$(boot2docker ip 2>/dev/null):2375

# Check mongo container already started (get last column of output)
docker ps | awk '{print $(NF)}' | grep mongo >/dev/null
if [ $? -eq 0 ]
then
	echo "Mongo container already running."
else
	# Check if mongo container already exists but is not started
	docker ps | awk '{print $(NF)}' | grep mongo >/dev/null
	if [ $? -eq 0 ]
	then
		# Starting existing mongo container
		echo "Starting existing mongo container..."
		docker start mongo
	else
		# Install/start mongo instance and map ports locally
		echo "Install and start Mongo:2.6.4 container ..."
		docker run --name mongo -p 27017:27017 -d mongo:2.6.4
	fi 
fi

# Build scrummie docker container
./docker_build.sh

# Remove a possible existing container with name 'scrummie'
docker rm scrummie >/dev/null

# Start scrummie docker container
echo "Starting Docker container ..."
DOCKER_LAST_IMG_ID=`cat .docker_img_id`
docker run -d --name="scrummie" --link mongo:mongodb -p 3000:3000 $DOCKER_LAST_IMG_ID /opt/scrummie/start-scrummie.sh
echo "Docker container started."

echo "Opening scrummie in browser..."
open http://localhost:3000

