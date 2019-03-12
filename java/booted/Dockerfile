# FROM openjdk:8
FROM gcr.io/distroless/java:8
WORKDIR /app/
COPY target/booted-0.0.1.jar .
EXPOSE 8080
CMD ["booted-0.0.1.jar"]