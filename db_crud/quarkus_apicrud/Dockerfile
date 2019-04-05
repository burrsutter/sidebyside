FROM registry.access.redhat.com/ubi7-dev-preview/ubi-minimal
WORKDIR /work/
COPY target/apicrud-1.0-runner /work/apicrud-1.0-runner
RUN chmod 775 /work
EXPOSE 8080
ENTRYPOINT [ "./apicrud-1.0-runner", "-Xmx10m", "-Xmn10m", "-Xms10m" ]
# ENTRYPOINT [ "./apicrud-1.0-runner", "-Xmx12M", "-Xms8M", "-Xmn12M"]
