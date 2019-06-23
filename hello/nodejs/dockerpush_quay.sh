#!/bin/bash

# use docker images | grep noded to get the image ID for $1

docker login quay.io

docker tag $1 quay.io/burrsutter/noded:1.0.1

docker push quay.io/burrsutter/noded:1.0.1

echo 'quay.io marks repositories as private by default'
echo 'to update https://screencast.com/t/uAooYnghlW'