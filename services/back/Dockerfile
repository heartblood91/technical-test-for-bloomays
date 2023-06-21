FROM node:14.21.3-slim as dev

RUN apt-get update && apt-get install -y \
  git \
  wget \
  nano \
  && rm -rf /var/lib/apt/lists/*

COPY ./deployment-script/docker-entrypoint.sh /
RUN chmod +x docker-entrypoint.sh

WORKDIR /tmp
COPY ./package*.json ./

RUN npm install

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["dev"]
