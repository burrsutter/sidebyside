#!/bin/bash

while true
do 
  curl $(minikube -p istio ip):$(kubectl get service/gonow -o jsonpath="{.spec.ports[*].nodePort}")
  sleep .2;
done

