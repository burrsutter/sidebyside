#!/bin/bash

open http://$(minikube -p knative ip):$(kubectl get service/goapicrud -o jsonpath="{.spec.ports[*].nodePort}")