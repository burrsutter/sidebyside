#!/bin/bash

while true
do 
  curl $(minikube -p istio ip):$(kubectl get service/pythoned -o jsonpath="{.spec.ports[*].nodePort}")
  sleep .2;
done

