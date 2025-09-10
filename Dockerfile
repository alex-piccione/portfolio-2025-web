FROM node:24-alpine3.22 AS build

WORKDIR /app

#RUN ls -l && echo "Listing of current directory:"
#RUN echo -e $(ls)

# copy only files needed for install first (better cache) into /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


# now copy the source and build
COPY . .
RUN yarn build

# --

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK CMD curl --fail http://localhost/ || exit 1

# both ARG + ENV are required to have the environment variable set in the container. Docker rubbish logic.
ARG VERSION 
ENV VITE_UI_VERSION=$VERSION

CMD ["nginx", "-g", "daemon off;"]
