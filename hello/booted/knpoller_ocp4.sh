#!/bin/bash
KSVC_URL="$(kubectl get ksvc booted -o jsonpath='{.status.url}')"

while true
do curl $KSVC_URL
sleep .3
done