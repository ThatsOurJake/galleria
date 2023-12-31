# Creating multi-stage build for production
FROM node:18-alpine as build
RUN apk update && apk add --no-cache g++ make py3-pip build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1
ARG NODE_ENV=production
ARG ADMIN_URL=change_me
ARG STRAPI_ADMIN_BACKEND_URL=change_me

ENV NODE_ENV=${NODE_ENV}
ENV ADMIN_URL=${ADMIN_URL}
ENV STRAPI_ADMIN_BACKEND_URL=${STRAPI_ADMIN_BACKEND_URL}

RUN npm i -g node-gyp

WORKDIR /opt/
COPY package.json yarn.lock ./
RUN yarn config set network-timeout 600000 -g && yarn install --production
ENV PATH /opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN yarn build

# Creating final production image
FROM node:16-alpine
RUN apk add --no-cache vips-dev
ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["yarn", "start"]
