FROM node:20.7.0

RUN mkdir -p /home/botblitz && chown -R node:node /home/botblitz

WORKDIR /home/botblitz

COPY package*.json ./

COPY server.js ./

COPY ../dist ./dist

COPY --chown=node:node . .

USER node

EXPOSE 4000

CMD [ "npm", "start" ]