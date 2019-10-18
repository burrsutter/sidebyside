#!/bin/bash
KSVC_URL="$(kubectl get ksvc gonow -o jsonpath='{.status.url}')"

while true
do curl $KSVC_URL
sleep .3
done