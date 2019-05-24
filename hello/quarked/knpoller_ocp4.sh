#!/bin/bash

KSVC_URL="$(kubectl get ksvc quarked -o jsonpath='{.status.domain}')"

while true
do curl $KSVC_URL
sleep .3
done