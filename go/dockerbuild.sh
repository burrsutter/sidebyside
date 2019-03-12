#!/bin/bash

env GOOS=linux GOARCH=amd64 go build gonow.go

docker build -t dev.local/rhdevelopers/gonow:0.0.1 .