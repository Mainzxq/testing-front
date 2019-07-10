FROM nginx:latest-alpin

RUN mkdir -p build
WORKDIR /build
COPY /build /build

ENV NPM_CONFIG_LOGLEVEL warn
