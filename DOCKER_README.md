# Running Scrummie in Docker

Just run docker_start_scrummie.sh. It will do everything that's required to run scrummie.

Use docker_build.sh when you only want to build a Docker container.

## Stop scrummie container
docker stop scrummie

## (Re)start scrummie container
docker start scrummie

## Deploy new version
- build new docker scrummie image with docker_build.sh.
- remove existing scrummie container 
	docker rm scrummie
- get image id of latest scrummie version: 
	docker images
- make sure mongo container is running
- run docker container with latest image: 
	docker run -d --name="scrummie" --link mongo:mongodb -p 3000:3000 <scrummie-image-id> /opt/scrummie/start-scrummie.sh

## TODO
* Simplify redeployment with script.
* Share folder/volume with scrummie container for fast development.