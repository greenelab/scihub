# Exit on errors
set -o errexit

# Load and serve the database in a MySQL Docker
docker run \
  --name mysql-libgen-scimag \
  --env MYSQL_ALLOW_EMPTY_PASSWORD=yes \
  --env MYSQL_DATABASE=scimag \
  --volume `pwd`/sql:/docker-entrypoint-initdb.d \
  --publish 3306:3306 \
  mysql:8.0.0
