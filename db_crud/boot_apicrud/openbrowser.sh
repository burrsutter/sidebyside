#!/bin/bash

open http://$(minikube -p knative ip):$(kubectl get service/bootapicrud -o jsonpath="{.spec.ports[*].nodePort}")