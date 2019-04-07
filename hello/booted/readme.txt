Set your docker cli tooling to the minikube docker daemon

eval $(minikube docker-env)

mvn clean package

./dockerbuild


For Knative on Kubernetes
kubectl apply -f knService.yml
./knpoller.sh


For vanilla Kubernetes
kubectl apply -f Deployment.yml
OR
kubectl apply -f Deployment_quay.yml

kubectl apply -f Service.yml

./poller.sh

