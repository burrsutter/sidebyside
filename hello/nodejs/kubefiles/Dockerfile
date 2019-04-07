FROM nodeshift/centos7-s2i-nodejs:10.x

EXPOSE 8080

WORKDIR /opt/app-root/src

COPY noded.js .
COPY package.json .

CMD ["npm", "start"]
