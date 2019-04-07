FROM registry.access.redhat.com/ubi7-dev-preview/ubi-minimal
WORKDIR /work/
COPY target/quarked-1.0.0-runner /work/quarked-1.0.0-runner
RUN chmod 775 /work
EXPOSE 8080
ENTRYPOINT [ "./quarked-1.0.0-runner", "-Xmx8m", "-Xmn8m", "-Xms8m" ]
# ENTRYPOINT [ "./quarked-1.0.0-runner", "-Dquarkus.http.host=0.0.0.0",  "-Xmx8m", "-Xmn8m", "-Xms8m", "-Dquarkus.http.io-threads=2", "-Dquarkus.http.worker-threads=2" ]