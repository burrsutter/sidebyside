#!/bin/bash

while true
do 
  curl $(minikube -p knative ip):$(kubectl get service/goapicrud -o jsonpath="{.spec.ports[*].nodePort}")/api/fruits
  echo
  sleep .2;
done

