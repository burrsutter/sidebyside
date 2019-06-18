
The pattern is primarily:

kubectl create namespace sidebyside
kubens sidebyside
OR
oc new-project sidebyside
oc adm policy add-scc-to-user privileged -z default -n sidebyside

1. Build the application using whatever tool is required for that platform.  If you can not build the app, then skip to step 3
2. ./dockerbuild.sh 
3. kubectl apply -f kubefiles/Deployment.yml
   or
   kubectl apply -f kubefiles/Deployment_quay.yml 
4. kubetl apply -f kubefiles/Service.yml
5. ./poller.sh

If you wish to try Knative:
1. same as above
2. same as above
3. kubectl apply -f kubefiles/knServing.yml
   or
   kubectl apply -f kubefiles/knServing_docker.yml
4. ./knpoller.sh
  or, it wish to see a more dramatic auto-scale, tweak concurrency
  ./knburst.sh
