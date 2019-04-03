#!/bin/bash

open http://$(minikube -p knative ip):$(kubectl get service/apicrud -o jsonpath="{.spec.ports[*].nodePort}")