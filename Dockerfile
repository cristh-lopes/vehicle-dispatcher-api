FROM --platform=linux/amd64 node:22-alpine as build

RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm install && \
    npm cache clean --force && \
    npm run build && \
    npm prune --production

FROM --platform=linux/amd64 node:22-alpine

WORKDIR /home/node/app

COPY --from=build /home/node/app/node_modules ./node_modules
COPY --from=build /home/node/app/dist ./dist
COPY --from=build /home/node/app/package.json .

EXPOSE 80

CMD ["/home/node/app/dist/main.js"]