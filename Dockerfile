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

RUN echo

COPY ./package*.json ./

RUN npm install -g node-gyp

USER node

RUN npm install

COPY ./src/config ./src/config

COPY ./src/models ./src/models

COPY ./src/.sequelizerc ./src/

RUN ls src &&  ls src/config && ls src/models && cat ./src/.sequelizerc

RUN npx sequelize-cli db:migrate

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
