FROM openjdk:8
ENV JAVA_APP_JAR apicrud-1.0-runner.jar
WORKDIR /app/
COPY target/$JAVA_APP_JAR .
COPY target/lib ./lib
EXPOSE 8080
CMD java -Dquarkus.http.host=0.0.0.0 $JAVA_OPTIONS -jar $JAVA_APP_JAR 