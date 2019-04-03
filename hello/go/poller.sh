#!/bin/bash

while true
do 
  curl $(minikube -p knative ip):$(kubectl get service/gonow -o jsonpath="{.spec.ports[*].nodePort}")
  sleep .2;
done

