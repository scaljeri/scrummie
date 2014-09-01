#!/bin/sh
# Starting meteor app in Docker
# Setting MONGO_URL to mongodb in other Docker image.

export MONGO_URL=mongodb://$MONGODB_PORT_27017_TCP_ADDR:$MONGODB_PORT_27017_TCP_PORT

meteor --settings=scrummie.json
