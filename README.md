# aphrodite

## usage
```shell script
docker build -t aphrodite -f .docker/Dockerfile .
docker run -v "$PWD/public_html":/usr/local/apache2/htdocs -p 8083:80 -d --name aphrodite aphrodite
```
