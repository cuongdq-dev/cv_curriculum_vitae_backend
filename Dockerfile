FROM node:14-alpine AS base

COPY package.json yarn.lock ./
RUN yarn

FROM base AS dist
COPY . ./

RUN yarn build

FROM base as node_modules

RUN npm prune --production
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map
RUN rm -rf node_modules/couchbase/src/

FROM node:14-alpine as final

RUN addgroup -S cv-backend && adduser -S cv-backend -G cv-backend
USER cv-backend

RUN mkdir -p /home/cv-backend/app

WORKDIR /home/cv-backend/app

COPY --from=base package.json /home/cv-backend/app/package.json
COPY --from=dist dist /home/cv-backend/app/dist
COPY --from=node_modules node_modules /home/cv-backend/app/node_modules

CMD yarn "start:prod"


# --------------------------------------
# Step 2: Set up nginx to serve the app
# --------------------------------------
# Use nginx:latest as the base image
FROM nginx:latest

# Overwriting nginx config with our own config file
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy over the build created in the Step 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Set the working directory
WORKDIR /usr/share/nginx/html

# Start nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]