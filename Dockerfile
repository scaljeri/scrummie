########################################
# Creating Docker image to run Scrummie
########################################

FROM ubuntu:12.04

MAINTAINER Joost den Boer

EXPOSE 3000

# Update APT and install curl
RUN apt-get update && apt-get install -y curl vim git

# Install latest NodeJS and NPM
RUN curl -sL https://deb.nodesource.com/setup | bash - && apt-get install -y nodejs

# Install Meteor
RUN curl https://install.meteor.com/ | sh

# Copy app in container
COPY . /opt/scrummie

# Copy Docker specific config/files
COPY .docker /opt/scrummie

# Run tools for building app
WORKDIR /opt/scrummie
RUN npm install -g gulp bower && npm install && bower install --allow-root

WORKDIR /opt/scrummie/.gulp
RUN npm install && gulp styles && gulp html

WORKDIR /opt/scrummie
# Run once to install npm dependency (werkt niet als direct aan packages wordt toegevoegd)
RUN meteor --settings=scrummie.json

#ENV MONGO_URL mongodb://$MONGODB_PORT_27017_TCP_ADDR:$MONGODB_PORT_27017_TCP_PORT
ENV ROOT_URL http://localhost:3000
ENV PORT 3000

