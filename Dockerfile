FROM node:10
RUN mkdir -p /home/node/opme  && chown -R node:node /home/node/opme
WORKDIR /home/node/opme
COPY . .
RUN npm install
RUN npm install -D
COPY --chown=node:node . .
USER node
RUN npm run build-prod
CMD [ "node", "src/server.js" ]