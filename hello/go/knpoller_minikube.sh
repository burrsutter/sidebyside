#!/bin/bash
INGRESSGATEWAY=istio-ingressgateway
IP_ADDRESS="$(minikube -p knative ip):$(kubectl get svc $INGRESSGATEWAY -n istio-system --output 'jsonpath={.spec.ports[?(@.port==80)].nodePort}')"
HOST_URL=$(kubectl get routes.serving.knative.dev gonow -o jsonpath='{.status.url}')
STRIPPED=$(echo $HOST_URL | cut -f2 -d':' | cut -f3 -d'/')

while true
do curl -H "Host: ${STRIPPED}" $IP_ADDRESS
sleep .3
done