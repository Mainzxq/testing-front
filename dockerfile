FROM nginx:latest

#MAINTAINER 维护者信息
LABEL MAINTAINER="mainzxq" 

COPY ./build /usr/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/

#EXPOSE 映射端口 good
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"