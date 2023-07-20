# FROM node:alpine
FROM node:16.3-alpine3.12

ARG USER=nodedockeruser

ARG UID=1001

ARG GID=1001

RUN adduser -u 1001 -g 1001 -h /home/nodedockeruser -D nodedockeruser

WORKDIR '/home/nodedockeruser/app'

COPY package.json .
RUN npm install
RUN npm install -g nodemon

# Declare the variables we may accept as build args
ARG WEB_PUSH_CONTACT
ARG PUBLIC_VAPID_KEY
ARG PRIVATE_VAPID_KEY

# Set the Vault's master token that's passed as build arg from build phase
# ENV VAULT_MASTER_TOKEN ${VAULT_MASTER_TOKEN}
ENV WEB_PUSH_CONTACT=${WEB_PUSH_CONTACT}
ENV PUBLIC_VAPID_KEY=${PUBLIC_VAPID_KEY}
ENV PRIVATE_VAPID_KEY=${PRIVATE_VAPID_KEY}

# Use it when we need to copy the assets in prodcution if we decide to go withouts volumes
COPY . .

RUN chown -R nodedockeruser:nodedockeruser /home/nodedockeruser/app
RUN chmod -R 777 /home/nodedockeruser/app

USER nodedockeruser

CMD ["npm", "run", "start"]
