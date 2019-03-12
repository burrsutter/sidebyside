#!/bin/bash

while true
do 
  curl $(minikube -p 9steps ip):$(kubectl get service/noded -o jsonpath="{.spec.ports[*].nodePort}")
  sleep .2;
done

