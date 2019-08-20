#!/bin/bash

# use docker images | grep booted to get the image ID for $1

docker login docker.io

docker tag $1 docker.io/burrsutter/booted:2.0.0

docker push docker.io/burrsutter/booted:2.0.0

