#!/bin/bash

env GOOS=linux GOARCH=amd64 go build gonow.go

docker build -f kubefiles/Dockerfile -t dev.local/burrsutter/gonow:1.0.0 .