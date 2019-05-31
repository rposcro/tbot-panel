FROM alpine:3.9

ARG SERVER_ROOT=/var/www
ARG DOCUMENT_ROOT=$SERVER_ROOT/localhost
ARG APACHE_CONFIG=/etc/apache2

RUN apk add --no-cache apache2
RUN apk add --no-cache vim
RUN rm -fr $DOCUMENT_ROOT/cgi-bin

EXPOSE 4240 4241

WORKDIR /tbot/panel

COPY dist/* $DOCUMENT_ROOT/tbot/panel
COPY deployment/apache/httpd.conf $APACHE_CONFIG

ENTRYPOINT ["httpd", "-DFOREGROUND", "-k", "start"]
