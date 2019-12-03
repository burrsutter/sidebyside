#!/bin/bash

export GRAALVM_HOME=/usr/lib/jvm/graalvm/

# Mac Native
# mvn package -Pnative

# Linux Native

# set default runtime to docker
runtime='docker'

usage () {
    echo "usage: ./buildNativeLinux.sh [-r docker|podman]"
}

while [ "$1" != "" ]; do
    case $1 in
        -r | --runtime )        shift
                                runtime=$1
                                ;;
        -h | --help )           usage
                                exit
                                ;;
        * )                     usage
                                exit 1
    esac
    shift
done

mvn package -Pnative -Dnative-image.docker-build=true -Dquarkus.native.container-runtime=${runtime} -DskipTests