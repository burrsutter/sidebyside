FROM openjdk:8
ENV JAVA_APP_JAR spring-boot-rest-http-crud-2.1.3.RELEASE.jar
WORKDIR /app/
COPY target/$JAVA_APP_JAR .
EXPOSE 8080
CMD java $JAVA_OPTIONS -jar $JAVA_APP_JAR 