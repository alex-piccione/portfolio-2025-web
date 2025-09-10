FROM node:24-alpine3.22 AS build

WORKDIR /app

#RUN ls -l && echo "Listing of current directory:"
#RUN echo -e $(ls)

COPY package.json /
COPY package-lock.json /

RUN yarn install

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
