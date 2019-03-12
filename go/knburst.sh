#!/bin/bash

INGRESSGATEWAY=istio-ingressgateway
IP_ADDRESS="$(minikube -p knative ip):$(kubectl get svc $INGRESSGATEWAY --namespace istio-system --output 'jsonpath={.spec.ports[?(@.port==80)].nodePort}')"
HOST_URL=$(kubectl get routes.serving.knative.dev gonow  -o jsonpath='{.status.domain}')

siege -r 1 -c 30 -d 2 -v -H "Host: ${HOST_URL}" ${IP_ADDRESS}