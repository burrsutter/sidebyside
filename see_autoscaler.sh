#!/bin/bash

echo "Make the following changes: "
echo 'container-concurrency-target-default: "10"'
echo 'scale-to-zero-grace-period: 30s'
echo 'stable-window: 30s'

kubectl -n knative-serving edit configmap config-autoscaler