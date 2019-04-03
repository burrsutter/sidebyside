#!/bin/bash

while true
do 
  curl $(minikube -p knative ip):$(kubectl get service/quarked -o jsonpath="{.spec.ports[*].nodePort}")
  sleep .2;
done

