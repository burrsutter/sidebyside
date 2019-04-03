#!/bin/bash

open http://$(minikube -p knative ip):$(kubectl get service/quarkusapicrud -o jsonpath="{.spec.ports[*].nodePort}")