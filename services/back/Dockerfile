FROM node:14.21.3-slim as dev

RUN apt-get update && apt-get install -y \
  git \
  wget \
  nano \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /workdir

COPY ./package*.json ./

RUN npm install

CMD ["npm", "run", "watch"]
