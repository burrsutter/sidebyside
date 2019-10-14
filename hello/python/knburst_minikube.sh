#!/bin/bash

INGRESSGATEWAY=istio-ingressgateway
IP_ADDRESS="$(minikube -p knative ip):$(kubectl get svc $INGRESSGATEWAY --namespace istio-system --output 'jsonpath={.spec.ports[?(@.port==80)].nodePort}')"
HOST_URL=$(kubectl get routes.serving.knative.dev noded  -o jsonpath='{.status.url}')
STRIPPED=$(echo $HOST_URL | cut -f2 -d':' | cut -f3 -d'/')

siege -r 1 -c 30 -d 2 -v -H "Host: ${STRIPPED}" ${IP_ADDRESS}