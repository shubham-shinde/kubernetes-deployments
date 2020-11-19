# Kubernetes-deployments

It is a basic implementation of deploying a full-stack application on the Kubernetes cluster. We have created three backend servers with nodeJS which is deployed on 3 separate deployment objects in the cluster with services to locate these deployments into the cluster. We have used the Ingress Nginx controller to forward the request to the given three services.

It is the basic implementation of deployment on microservices in Enterprises. We'll have one endpoint to use all the services of the cluster and there will be no other way to access services from the outer environment.

## NodeJS App

check out file

**backendServer/index.js**

It is an HTTP server open on port 3000(default) which returns server(count) and server_environment(prod | staging) and all environments variables on /env endpoint. We haven't used express to keep the size of the image small.

## Docker

We have used Docker to build an executable image of the application. check file

**backendServer/DockerFile**

It uses NodeJS slim version to minimize the size of the image. Image is built with the command

> docker build -t [dockerhubName/backend_server] .

> docker push [dockerhubName/backend_server]

to push image to docker hub registry.

for testing image on local, we can use

> docker run -p 3000:3000 [dockerhubName/bacekend_server]

Once the image is available on docker hub we can use it to build containers into our cluster.

## Deployment Object

**backendServer/serverOne.yaml**

It is a basic YAML configuration for deployment objects. (Note below --- is service configuration).

With command

> kubectl apply -f backendService/serverOne.yaml

will create a deployment with 1 pad/container (specified by replicas: 1) in the cluster and random IP is assigned to it. This object will not be accessible to use.

## Service Object

\*\*backendServer/serverOne.yaml

below --- is the server configuration. It locates deployment object by labels and opens it for use. They are four types of services specified in type.

1. Node (Mapped to node port. used in testing)
2. LoadBalances (use Node type with external load-balancer)
3. ClusterIP (assigns internal IP not accessible to use directly)
4. ExternalName (map to specified external name)

We have used ClusterIP as we will use Nginx-Ingress for routing to the server internally.

**We have four YAML files for deployment and respective services**

## Ingress Controller

It is used to give services externally-reachable URLs, load-balance traffic, and terminate SSL. We used ingress to reverse proxy applications services and combine services into one domain.

> ingress.yaml

We used domain shubham.tech **Add {expternal IP given by ingress} shubham.tech at end of /etc/hosts file**

We have used rewrite rules provided by Nginx to provide the correct URL to the services.

