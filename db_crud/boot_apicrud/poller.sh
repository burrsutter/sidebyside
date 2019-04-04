#!/bin/bash

while true
do 
  curl $(minikube -p knative ip):$(kubectl get service/bootapicrud -o jsonpath="{.spec.ports[*].nodePort}")/fruits
  echo
  sleep .2;
done

