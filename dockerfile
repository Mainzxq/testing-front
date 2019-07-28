FROM nginx:latest

#MAINTAINER 维护者信息
LABEL MAINTAINER="mainzxq" 

RUN mkdir -p build
RUN npm install
RUN npm run build
WORKDIR /build
COPY /build /build

ENV NPM_CONFIG_LOGLEVEL warn

#EXPOSE 映射端口
EXPOSE 80