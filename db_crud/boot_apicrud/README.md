# Running the demo

First launch the PosgreSQL database:

> docker run --ulimit memlock=-1:-1 -it --rm=true --memory-swappiness=0 --name postgres-quarkus-rest-http-crud -e POSTGRES_USER=restcrud -e POSTGRES_PASSWORD=restcrud -e POSTGRES_DB=rest-crud -p 5432:5432 postgres:10.5

Then build the application:

>  mvn clean install

Run it:

> java -jar target/spring-boot-rest-http-crud-1.5.16-5-SNAPSHOT.jar

Simple SPA UI:

> http://localhost:8080/index.html


