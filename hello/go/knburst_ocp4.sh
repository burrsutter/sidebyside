#!/bin/bash

KSVC_URL="$(kubectl get ksvc gonow -o jsonpath='{.status.domain}')"

siege -r 1 -c 40 -d 2 -v $KSVC_URL