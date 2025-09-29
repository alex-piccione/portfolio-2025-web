FROM node:24-alpine3.22 AS build

WORKDIR /app

# copy only files needed for install first (better cache) into /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# both ARG + ENV are required to have the environment variable set in the container. Docker rubbish logic.
ARG VERSION 
ENV VITE_UI_VERSION=$VERSION
RUN echo "VITE_UI_VERSION=$VITE_UI_VERSION"

# now copy the source and build
COPY . .
RUN yarn build

# --

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# required for SPA fallback
COPY --from=build nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

HEALTHCHECK CMD curl --fail http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
