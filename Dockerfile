FROM php:8.0-fpm-alpine

WORKDIR /var/www/app


RUN apk update && apk add \
    curl \
    libpng-dev \
    libxml2-dev \
    libsodium-dev \
    zip \
    libzip-dev \
    unzip

RUN docker-php-ext-install pdo pdo_mysql sodium zip gd \
    && docker-php-ext-enable sodium zip gd \
    && apk --no-cache add nodejs npm

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

USER root

RUN chmod 777 -R /var/www/app