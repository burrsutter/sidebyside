#!/bin/bash
INGRESSGATEWAY=istio-ingressgateway
IP_ADDRESS="$(minikube -p knative ip):$(kubectl get svc $INGRESSGATEWAY --namespace istio-system --output 'jsonpath={.spec.ports[?(@.port==80)].nodePort}')"
HOST_URL=$(kubectl get routes.serving.knative.dev booted -o jsonpath='{.status.domain}')

while true
do curl -H "Host: ${HOST_URL}" $IP_ADDRESS
sleep .3
done