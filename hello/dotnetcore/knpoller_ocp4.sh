#!/bin/bash

KSVC_URL="$(kubectl get ksvc csharp -o jsonpath='{.status.domain}')"

while true
do curl $KSVC_URL
sleep .3
echo
done