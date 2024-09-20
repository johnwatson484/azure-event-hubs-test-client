# Development
FROM node:20-alpine AS development

WORKDIR /home/node

USER node
ENV NODE_ENV=development

# Set global npm dependencies to be stored under the node user directory
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

ARG PORT=3012
ENV PORT=${PORT}
EXPOSE ${PORT}
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node ./app ./app
CMD [ "npm", "run", "start:watch" ]

# Production
FROM development AS production
ENV NODE_ENV=production
RUN npm ci
CMD [ "node", "app" ]
