#!/bin/bash

while true
do 
  curl $(minikube -p 9steps ip):$(kubectl get service/apicrud -o jsonpath="{.spec.ports[*].nodePort}")/fruits
  echo
  sleep .2;
done

