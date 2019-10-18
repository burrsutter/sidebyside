#!/bin/bash

KSVC_URL="$(kubectl get ksvc csharp -o jsonpath='{.status.url}')"

while true
do curl $KSVC_URL
sleep .3
echo
done