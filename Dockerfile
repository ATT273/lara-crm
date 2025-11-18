FROM php:8.2-fpm

# Install system deps
RUN apt-get update && apt-get install -y \
    git zip unzip sqlite3 libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chmod -R 775 storage bootstrap/cache database

# Laravel APP key (Render will run this command automatically)
RUN php artisan key:generate --force

# Expose Render port
EXPOSE 10000

# Run Laravel web server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
