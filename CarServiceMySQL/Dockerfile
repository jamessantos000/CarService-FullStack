FROM mysql:latest

ENV MYSQL_DATABASE=carservice
ENV MYSQL_USER=caruser
ENV MYSQL_PASSWORD=carpass
ENV MYSQL_ROOT_PASSWORD=carpass

COPY init.sql /docker-entrypoint-initdb.d/