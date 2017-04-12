# Load and serve the database in a MySQL Docker
docker run \
  --env MYSQL_ALLOW_EMPTY_PASSWORD=yes \
  --env MYSQL_DATABASE=scimag \
  --volume `pwd`/mysql:/docker-entrypoint-initdb.d \
  --publish 3306:3306 \
  --rm \
  mysql:8.0.0
