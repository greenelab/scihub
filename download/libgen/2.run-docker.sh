# Exit on errors
set -o errexit

# Create directories for Docker volumes on host
mkdir --parents mysql.db
mkdir --parents sql

# Load and serve the database in a MySQL Docker
docker run \
  --name mysql-libgen-scimag \
  --env MYSQL_ALLOW_EMPTY_PASSWORD=yes \
  --env MYSQL_DATABASE=scimag \
  --volume `pwd`/mysql.db:/var/lib/mysql \
  --volume `pwd`/sql:/docker-entrypoint-initdb.d \
  --publish 3306:3306 \
  mysql:8.0.0
