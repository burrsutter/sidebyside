#!/bin/bash

# use docker images | grep noded to get the image ID for $1

docker login docker.io

docker tag $1 docker.io/burrsutter/noded:1.0.0

docker push docker.io/burrsutter/noded:1.0.0

