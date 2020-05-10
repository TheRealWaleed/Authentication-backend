FROM node:10-alpine

RUN set -eux; \
	apk add --no-cache --virtual .build-deps \
		g++ \
		gcc \
		git \
		make \
		python \
	;

RUN mkdir -p /home/node/Authentication-backend/node_modules && chown -R node:node /home/node/Authentication-backend

WORKDIR /home/node/Authentication-backend

COPY ./package*.json ./

RUN npm install -g node-gyp

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
