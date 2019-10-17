#!/bin/bash
KSVC_URL="$(kubectl -n ajug get ksvc noded -o jsonpath='{.status.url}')"

while true
do curl $KSVC_URL
sleep .3
done