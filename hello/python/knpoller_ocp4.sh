#!/bin/bash

KSVC_URL="$(kubectl get ksvc pythoned -o jsonpath='{.status.domain}')"

while true
do curl $KSVC_URL
sleep .3
done