FROM openjdk:8-jdk-alpine
# FROM gcr.io/distroless/java:8
WORKDIR /app/
COPY target/booted-1.0.0.jar .
EXPOSE 8080
ENTRYPOINT ["java","-Xmx32M", "-Xms32m","-jar","booted-1.0.0.jar"]
